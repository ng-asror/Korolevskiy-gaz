import { Component, inject, OnInit, resource, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Basket, Telegram } from './core';
import { Login } from './core/services/login';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private telegram = inject(Telegram);
  private loginService = inject(Login);
  private basketService = inject(Basket);

  protected readonly title = signal('Королевский газ');

  async ngOnInit(): Promise<void> {
    this.telegram.init('#fecc68');
    const tg_id = (await this.telegram.getTgUser()).user.id;
    try {
      const res = await firstValueFrom(
        this.loginService.userExists(tg_id.toString())
      );
      if (!res.exists) this.auth();
    } catch (error) {
      console.error(error);
    }
    await firstValueFrom(this.basketService.getBasket(tg_id.toString()));
  }

  private async auth(): Promise<void> {
    firstValueFrom(
      this.loginService.login({
        tg_id: (await this.telegram.getTgUser()).user.id.toString(),
        username: (await this.telegram.getTgUser()).user.username,
      })
    );
  }
}
