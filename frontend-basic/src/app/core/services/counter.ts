import { inject, Injectable } from '@angular/core';
import { Basket } from './basket';
@Injectable({
  providedIn: 'root',
})
export class Counter {
  private basketService = inject(Basket);
  isCounted(uuid: string | number): { counted: boolean; quantity: number } {
    let counter = { counted: false, quantity: 0 };
    this.basketService.localBasket$.subscribe({
      next: (basket) => {
        if (basket) {
          const item =
            basket.azots.find((i) => i.price_type_id === uuid) ||
            basket.accessories.find((i) => i.product.uuid === uuid);
          if (item) {
            counter = { counted: true, quantity: item.quantity };
          }
        }
      },
    });
    return counter;
  }
}
