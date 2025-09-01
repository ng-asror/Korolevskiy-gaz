import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import {
  IDecoration,
  IMyOrdersRes,
  IOrderCreateRes,
  IOrderFinishReq,
  IServices,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class Order {
  constructor(private http: HttpClient) {}

  localOrders = new BehaviorSubject<IMyOrdersRes | null>(null);
  orders$ = this.localOrders.asObservable();

  createOrder(tg_id: string, promocode: string): Observable<IOrderCreateRes> {
    const body = { tg_id, promocode };
    return this.http.post<IOrderCreateRes>(
      `${environment.url}/public/orders/create`,
      body
    );
  }

  deleteOrder(tg_id: string, id: number): Observable<any> {
    return this.http.post<any>(
      `${environment.url}/public/orders/${id}/delete`,
      { tg_id }
    );
  }

  getServices(): Observable<IServices> {
    return this.http.get<IServices>(`${environment.url}/public/services`);
  }

  myOrders(tg_id: string): Observable<IMyOrdersRes> {
    return this.http
      .post<IMyOrdersRes>(`${environment.url}/public/orders`, {
        tg_id,
      })
      .pipe(
        tap((res) => {
          if (res.data.length !== 0) {
            this.localOrders.next(res);
          } else {
            this.localOrders.next(null);
          }
        })
      );
  }

  ofotmitFinish(id: number, data: IOrderFinishReq): Observable<any> {
    return this.http.post<any>(
      `${environment.url}/public/orders/${id}/finish`,
      data
    );
  }
  deleteLocalOrder(id: number): void {
    const current = this.localOrders.getValue();
    if (!current) return;
    const filter = current.data.filter((order) => order.id !== id);
    this.localOrders.next({
      ...current,
      data: filter,
    });
  }
}
