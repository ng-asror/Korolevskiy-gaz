import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IAccessor, IBasket } from '../interfaces';
import { environment } from '../../../environments/environment.development';
import { Basket } from './basket';
import { calcCont } from '../utils';
import { Telegram } from './telegram';

@Injectable({
  providedIn: 'root',
})
export class Accessor {
  private basketService = inject(Basket);
  private endpoind = 'public';
  private telegram = inject(Telegram);
  currentBasket = this.basketService.localBasket.getValue();
  constructor(private http: HttpClient) {}

  getAccessors(): Observable<IAccessor> {
    return this.http.get<IAccessor>(
      `${environment.url}/${this.endpoind}/accessories`
    );
  }

  kupit(tg_id: string, product_id: number): Observable<IBasket> {
    return this.http
      .post<IBasket>(`${environment.url}/public/cart/add/accessuary`, {
        tg_id,
        product_id,
      })
      .pipe(
        tap((res) => {
          calcCont(res, this.basketService);
          this.telegram.hapticFeedback('light');
        })
      );
  }

  minus(
    tg_id: string,
    product_id: number,
    quantity?: number
  ): Observable<IBasket> {
    return this.http
      .post<IBasket>(`${environment.url}/public/cart/minus/accessuary`, {
        tg_id,
        product_id,
        quantity,
      })
      .pipe(
        tap((res) => {
          calcCont(res, this.basketService);
          this.telegram.hapticFeedback('light');
        })
      );
  }
}
