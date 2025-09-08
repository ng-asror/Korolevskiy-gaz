import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Basket, LayoutService, Telegram } from '../core';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { NumberPipe } from '../pipe';
import { createMask, InputMaskModule } from '@ngneat/input-mask';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    NgClass,
    FormsModule,
    NgIf,
    AsyncPipe,
    NumberPipe,
    InputMaskModule,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  private telegram = inject(Telegram);
  private layoutService = inject(LayoutService);
  private basketService = inject(Basket);
  protected basket = this.basketService.localBasket$;
  protected soft(): void {
    this.telegram.hapticFeedback('light');
  }
  updates = this.layoutService.updates;
  phone: string = '';
  phoneMask = createMask({
    mask: '+7 (999) 999-9999',
    placeholder: '_',
    clearIncomplete: true,
  });

  callModal = signal<{
    modal_bg: boolean;
    phone_number: boolean;
    modal_success: boolean;
    sps: boolean;
  }>({
    modal_bg: false,
    phone_number: false,
    modal_success: false,
    sps: false,
  });

  async sendPhoneNum(): Promise<void> {
    if (this.phone !== '') {
      console.log(this.phone);
      const tg_id = (await this.telegram.getTgUser()).user.id.toString();
      await firstValueFrom(
        this.layoutService.callback({ tg_id: tg_id, phone: this.phone })
      ).then(() => {
        this.callModal.set({
          modal_bg: true,
          phone_number: false,
          modal_success: true,
          sps: false,
        });
      });
    } else {
      this.telegram.showAlert('Пожалуйста, введите корректный номер телефона');
    }
  }
}
