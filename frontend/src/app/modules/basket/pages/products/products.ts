import { AsyncPipe, CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Basket, Order, Telegram } from '../../../../core';
import { ProductCard } from '../../components';
import { NumberPipe } from '../../../../pipe';
import { debounceTime, firstValueFrom, Subject, tap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    ProductCard,
    NumberPipe,
    FormsModule,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements AfterViewInit {
  private telegram = inject(Telegram);
  private basketService = inject(Basket);
  private orderService = inject(Order);
  private inputSubject = new Subject<string>();
  protected localBasket = this.basketService.localBasket$;
  protected promocode$ = this.basketService.promocode$;
  constructor(private router: Router) {
    this.inputSubject
      .pipe(
        debounceTime(2000),
        tap((res) => {
          this.basketService.promoFind(res);
        })
      )
      .subscribe();
  }
  private orderDataIds!: { azot: number[]; aksessuari: number[] };

  protected inputVal: string = '';
  @ViewChild('allChecked') selectorAllCheked!: ElementRef;
  allChecked: boolean = false;
  selectedItems = signal<number[]>([]);

  protected onToggled(event: {
    id: number;
    productType: 'azot' | 'aksessuari';
    event: Event;
  }): void {
    const isChecked = (event.event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedItems().push(event.id);
      this.orderDataIds[event.productType].push(event.id);
    } else {
      this.selectedItems.set(
        this.selectedItems().filter((v) => v !== event.id)
      );
      this.orderDataIds[event.productType] = this.orderDataIds[
        event.productType
      ].filter((v) => v !== event.id);
    }
  }

  toggleAllChecked() {
    if (this.allChecked) {
      this.localBasket.subscribe({
        next: (res) => {
          if (res) {
            this.orderDataIds = {
              azot: res.azots.map((item) => item.product_id),
              aksessuari: res.accessories.map((item) => item.product_id),
            };
          }
        },
      });
      this.selectedItems.set([
        ...this.orderDataIds.azot,
        ...this.orderDataIds.aksessuari,
      ]);
    } else {
      this.orderDataIds = {
        azot: [],
        aksessuari: [],
      };
      this.selectedItems.set([]);
    }
  }

  deleteAll(): void {
    console.log(this.selectedItems());
  }

  protected async createOrder(): Promise<void> {
    const tg_id = (await this.telegram.getTgUser()).user.id;
    const promocode = await firstValueFrom(this.promocode$);
    await firstValueFrom(
      this.orderService.createOrder(
        tg_id.toString(),
        promocode ? promocode.promocode : ''
      )
    ).then((res) => {
      this.basketService.localBasket.next(null);
      this.basketService.decorationNext(res);
      this.router.navigate(['/basket/oformit']);
    });
  }
  protected promoInp(value: string): void {
    this.inputSubject.next(value);
  }

  ngAfterViewInit(): void {
    this.selectorAllCheked?.nativeElement!;
  }
}
