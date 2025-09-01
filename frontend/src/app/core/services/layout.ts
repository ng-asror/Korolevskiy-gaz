import { HttpClient } from '@angular/common/http';
import { Injectable, resource } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { IUpdates } from '../interfaces';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private http: HttpClient) {}
  private getUpdates(): Observable<IUpdates> {
    return this.http.get<IUpdates>(`${environment.url}/public/updates`);
  }

  public updates = resource({
    loader: () => firstValueFrom(this.getUpdates()),
  });
}
