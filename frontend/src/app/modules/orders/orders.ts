import { Component, inject, OnInit } from '@angular/core';
import { Basket, Order, Telegram } from '../../core';
import { firstValueFrom } from 'rxjs';
import { OrderCard } from './components';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { IMyOrdersRes, IOrderCreateRes } from '../../core/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [OrderCard, NgIf, NgForOf, AsyncPipe],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit {
  private telegram = inject(Telegram);
  private basketService = inject(Basket);
  private ordersService = inject(Order);
  protected orders$ = this.ordersService.orders$;
  constructor(private router: Router) {}
  async ngOnInit(): Promise<void> {
    const tgUser = await this.telegram.getTgUser();
    await firstValueFrom(
      this.ordersService.myOrders(tgUser.user.id.toString())
    );
  }
  protected goOformit(data: IOrderCreateRes): void {
    this.basketService.decorationNext(data);
    this.router.navigate(['/basket/oformit']);
  }
}
