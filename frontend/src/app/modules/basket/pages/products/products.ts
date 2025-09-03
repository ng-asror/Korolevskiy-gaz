import { AsyncPipe, CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Accessor,
  Azot,
  Basket,
  ISelectedItems,
  LayoutService,
  Order,
  Telegram,
} from '../../../../core';
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
export class Products implements OnInit, AfterViewInit {
  private telegram = inject(Telegram);
  private basketService = inject(Basket);
  private orderService = inject(Order);
  private azotService = inject(Azot);
  private accessorService = inject(Accessor);
  private layoutService = inject(LayoutService);
  private inputSubject = new Subject<string>();
  protected localBasket = this.basketService.localBasket$;
  protected promocode$ = this.basketService.promocode$;
  protected updates$ = this.layoutService.updates$;
  protected orderData: ISelectedItems = {
    azot: [],
    accessor: [],
  };
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
  ngOnInit(): void {
    this.localBasket.subscribe({
      next: (res) => {
        if (res) {
          const azots = res.azots.map((i) => ({
            quantity: i.quantity,
            id: i.product.id,
            price_type_id: i.price_type_id,
          }));
          const accessor = res.accessories.map((i) => ({
            quantity: i.quantity,
            id: i.product.id,
          }));
          this.orderData = { azot: azots, accessor: accessor };
        }
      },
    });
  }

  protected inputVal: string = '';
  @ViewChild('allChecked') selectorAllCheked!: ElementRef;
  allChecked: boolean = false;
  selectedItems = signal<ISelectedItems>({
    azot: [],
    accessor: [],
  });

  protected onToggled(event: {
    id: number;
    productType: 'azot' | 'accessor';
    event: Event;
    quantity: number;
    price_type_id?: number;
  }): void {
    const isChecked = (event.event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedItems()[event.productType].push({
        id: event.id,
        quantity: event.quantity,
        price_type_id: event.price_type_id,
      });
    } else {
      this.selectedItems.set({
        ...this.selectedItems(),
        [event.productType]: this.selectedItems()[event.productType].filter(
          (v) => v.id !== event.id
        ),
      });
    }
    const allIds = [...this.orderData.azot, ...this.orderData.accessor];
    this.allChecked =
      allIds.length ===
      this.selectedItems().accessor.length + this.selectedItems().azot.length;
  }

  toggleAllChecked() {
    if (this.allChecked === true) {
      this.selectedItems.set({
        accessor: this.orderData.accessor,
        azot: this.orderData.azot,
      });
    } else {
      this.selectedItems.set({ accessor: [], azot: [] });
    }
  }

  async deleteProduct(): Promise<void> {
    const tg_id = (await this.telegram.getTgUser()).user.id.toString();
    if (this.selectedItems().accessor.length !== 0) {
      this.selectedItems().accessor.forEach(async (item) => {
        await firstValueFrom(
          this.accessorService.minus(tg_id, item.id, item.quantity)
        );
      });
    }
    if (this.selectedItems().azot.length !== 0) {
      this.selectedItems().azot.forEach(async (item) => {
        await firstValueFrom(
          this.azotService.minus(
            tg_id,
            item.id,
            item.price_type_id!,
            item.quantity
          )
        );
      });
    }
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
