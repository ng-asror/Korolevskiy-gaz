import { Component, inject, resource } from '@angular/core';
import { Basket, Order } from '../../../../core';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { OformitCard } from '../../components/oformit-card/oformit-card';
import { NumberPipe } from '../../../../pipe';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-oformit',
  imports: [NgIf, AsyncPipe, OformitCard, NgFor, DatePipe, NumberPipe],
  templateUrl: './oformit.html',
  styleUrl: './oformit.scss',
})
export class Oformit {
  private basketService = inject(Basket);
  private orderService = inject(Order);
  protected decoration$ = this.basketService.decoration$;
  allCount = this.basketService.decorationProductCount();
  services = resource({
    loader: () => firstValueFrom(this.orderService.getServices()),
  });
}
