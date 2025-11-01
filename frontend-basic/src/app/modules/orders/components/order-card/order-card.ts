import { DatePipe, NgClass } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { NumberPipe } from '../../../../pipe';
import { ProductCard } from '../product-card/product-card';
import { Order, Telegram } from '../../../../core';
import { IMyOrdersRes } from '../../../../core/interfaces';

export interface Status {
  label: string;
  color: string;
}
export type StatusKey =
  | 'new'
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'completed'
  | 'deleted';

@Component({
  selector: 'app-order-card',
  imports: [ProductCard, NumberPipe, DatePipe, NgClass],
  templateUrl: './order-card.html',
  styleUrl: './order-card.scss',
})
export class OrderCard {
  private telegram = inject(Telegram);
  private ordersService = inject(Order);
  protected order_count = signal<number>(0);
  orderInp = input.required<IMyOrdersRes['data'][0]>({
    alias: 'order',
  });

  constructor() {
    effect(() => {
      const accessor_count = this.orderInp().accessories.reduce(
        (count, item) => count + item.count,
        0
      );
      const azots_count = this.orderInp().azots.reduce(
        (count, item) => count + item.count,
        0
      );

      this.order_count.set(azots_count + accessor_count);
    });
  }

  STATUS_MAP: Record<StatusKey, Status> = {
    new: { label: 'не оформлен', color: '#DC1F1F' },
    pending: { label: 'оформлен', color: '#2FDC1F' },
    accepted: { label: 'принято', color: '#1D4ED8' },
    rejected: { label: 'отклонено', color: '#EF4444' },
    completed: { label: 'завершено', color: '#14B8A6' },
    deleted: { label: 'deleted', color: '#9333EA' },
  };
}
