import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { effect, Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import {
  IBasket,
  IDecoration,
  ILocalBasket,
  IMyOrdersRes,
  IOrderCreateRes,
  IOrderResData,
  IPromocode,
  IPromoRes,
} from '../interfaces';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Basket {
  localBasket = new BehaviorSubject<ILocalBasket | null>(null);
  private decoration = new BehaviorSubject<IOrderResData | null>(null);
  private promo = new BehaviorSubject<IPromocode | null>(null);
  decorationProductCount = signal<number>(0);
  public localBasket$ = this.localBasket.asObservable();
  public decoration$ = this.decoration.asObservable();
  public promocode$ = this.promo.asObservable();

  constructor(private http: HttpClient) {
    effect(() => {
      const dec = this.decoration.getValue();
      if (dec) {
        const accessorCount = dec.accessories.reduce(
          (count, item) => count + item.count,
          0
        );
        const azotCount = dec.azots.reduce(
          (count, item) => count + item.count,
          0
        );
        this.decorationProductCount.set(azotCount + accessorCount);
      }
    });
  }

  getBasket(tg_id: string): Observable<IBasket> {
    return this.http
      .post<IBasket>(`${environment.url}/public/cart`, { tg_id })
      .pipe(
        tap((res) => {
          const accessoriesCount = res.data.accessories.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          const azotCount = res.data.azots.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          const currentBasket = this.localBasket.getValue();
          this.localBasket.next({
            azots: res.data.azots,
            accessories: res.data.accessories,
            total_count: accessoriesCount + azotCount,
            total_price: res.data.total_price,
          });
        })
      );
  }

  /**
   *
   * @param promocode
   * @returns
   */
  private promoCheck(promocode: string): Observable<IPromoRes> {
    return this.http
      .post<IPromoRes>(`${environment.url}/public/promocode/check`, {
        promocode,
      })
      .pipe(
        tap((res) => {
          if (res.success) this.promo.next(res.data);
        }),
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            this.promo.next(null);
          }
          return of();
        })
      );
  }

  /**
   *
   * @param promocode
   */
  public promoFind(promocode: string): void {
    this.promoCheck(promocode).subscribe();
  }
  /**
   *
   * @param data
   */
  public decorationNext(data: IOrderCreateRes | null): void {
    if (data) this.decoration.next(data.data);
    else this.decoration.next(null);
  }
}
