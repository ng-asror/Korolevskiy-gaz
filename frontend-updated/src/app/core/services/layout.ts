import { HttpClient } from '@angular/common/http';
import { Injectable, resource } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable, tap } from 'rxjs';
import { ICallbackRes, IUpdates } from '../interfaces';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private http: HttpClient) {}
  private updatesSubject = new BehaviorSubject<IUpdates | null>(null);
  updates$ = this.updatesSubject.asObservable();
  private getUpdates(): Observable<IUpdates> {
    return this.http.get<IUpdates>(`${environment.url}/public/updates`).pipe(
      tap((res) => {
        this.updatesSubject.next(res);
      })
    );
  }

  public updates = resource({
    loader: () => firstValueFrom(this.getUpdates()),
  });

  callback(data: { tg_id: string; phone: string }): Observable<ICallbackRes> {
    return this.http.post<ICallbackRes>(
      `${environment.url}/public/callback-requests`,
      data
    );
  }
}
