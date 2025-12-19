import { HttpClient } from '@angular/common/http';
import { Injectable, resource } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable, tap } from 'rxjs';
import {
  ICallbackRes,
  ICanSpin,
  IRouletteItemsRes,
  ISpinRes,
  IUpdates,
} from '../interfaces';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private http: HttpClient) {}

  // SUBJECTS
  public canSpinOrderSubject = new BehaviorSubject<{
    serie?: boolean;
    type?: boolean;
  }>({});
  private updatesSubject = new BehaviorSubject<IUpdates | null>(null);
  public canSpinSubject = new BehaviorSubject<{
    spin: boolean;
    order_id?: number;
  }>({ spin: false });

  // OBSERVERS
  canSpin$ = this.canSpinSubject.asObservable();
  updates$ = this.updatesSubject.asObservable();

  private getUpdates(): Observable<IUpdates> {
    return this.http.get<IUpdates>(`${environment.url}/public/updates`).pipe(
      tap((res) => {
        this.updatesSubject.next(res);
      })
    );
  }

  public updates = resource({
    loader: () => firstValueFrom(this.getUpdates()).then((res) => res.data),
  });

  callback(data: { tg_id: string; phone: string }): Observable<ICallbackRes> {
    return this.http.post<ICallbackRes>(
      `${environment.url}/public/callback-requests`,
      data
    );
  }

  roulette_items(): Observable<IRouletteItemsRes> {
    return this.http.get<IRouletteItemsRes>(
      `${environment.url}/public/roulette/items`
    );
  }

  spin(order_id: number, tg_id: string): Observable<ISpinRes> {
    return this.http.post<ISpinRes>(`${environment.url}/public/roulette/spin`, {
      order_id,
      tg_id,
    });
  }

  can_spin(order_id: number, tg_id: string): Observable<ICanSpin> {
    return this.http.post<ICanSpin>(
      `${environment.url}/public/roulette/can-spin`,
      { order_id, tg_id }
    );
  }
}
