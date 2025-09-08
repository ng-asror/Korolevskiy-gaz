import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { ILogin, ILoginResponse, IUserExists } from '../interfaces';
import { environment } from '../../../environments/environment.development';
import { Telegram } from './telegram';

@Injectable({
  providedIn: 'root',
})
export class Login {
  private telegram = inject(Telegram);
  constructor(private http: HttpClient) {}
  /**
   * This method sends a login request to the server.
   * It uses the Telegram service to store the user's Telegram ID in cloud storage.
   * @param data - The login data containing user information.
   * @returns An observable of the login response.
   */
  login(data: ILogin): Observable<ILoginResponse> {
    return this.http
      .post<ILoginResponse>(`${environment.url}/public/register`, data, {
        headers: { Accept: 'application/json' },
      })
      .pipe(
        tap(async (res: ILoginResponse) => {
          await this.telegram.setCloudItem('tg_id', res.data.tg_id);
        })
      );
  }

  async isLoggedIn(): Promise<boolean> {
    const tg_id: string | null = await this.telegram.getCloudStorage('tg_id');
    return tg_id ? true : false;
  }

  userExists(tg_id: string): Observable<IUserExists> {
    return this.http.post<IUserExists>(
      `${environment.url}/public/user-exists`,
      { tg_id }
    );
  }
}
