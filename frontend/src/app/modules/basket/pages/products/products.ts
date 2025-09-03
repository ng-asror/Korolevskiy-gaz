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
import { Basket, LayoutService, Order, Telegram } from '../../../../core';
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
  private layoutService = inject(LayoutService);
  private inputSubject = new Subject<string>();
  protected localBasket = this.basketService.localBasket$;
  protected promocode$ = this.basketService.promocode$;
  protected updates$ = this.layoutService.updates$;
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
          this.orderDataIds = {
            azot: res.azots.map((item) => item.product.id),
            accessor: res.accessories.map((item) => item.product.id),
          };
        }
      },
    });
  }
  protected orderDataIds: { azot: number[]; accessor: number[] } = {
    azot: [],
    accessor: [],
  };

  protected inputVal: string = '';
  @ViewChild('allChecked') selectorAllCheked!: ElementRef;
  allChecked: boolean = false;
  selectedItems = signal<{ azot: number[]; accessor: number[] }>({
    azot: [],
    accessor: [],
  });

  protected onToggled(event: {
    id: number;
    productType: 'azot' | 'accessor';
    event: Event;
  }): void {
    const isChecked = (event.event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedItems()[event.productType].push(event.id);
    } else {
      // this.selectedItems.set(
      //   this.selectedItems().filter((v) => v !== event.id)
      // );
      this.selectedItems.set({
        ...this.selectedItems(),
        [event.productType]: this.selectedItems()[event.productType].filter(
          (v) => v !== event.id
        ),
      });
    }
    const allIds = [...this.orderDataIds.azot, ...this.orderDataIds.accessor];
    this.allChecked =
      allIds.length ===
      this.selectedItems().accessor.length + this.selectedItems().azot.length;
  }

  toggleAllChecked() {
    if (this.allChecked === true) {
      this.selectedItems.set({
        accessor: this.orderDataIds.accessor,
        azot: this.orderDataIds.azot,
      });
    } else {
      this.selectedItems.set({ accessor: [], azot: [] });
    }
  }

  async deleteProduct(): Promise<void> {
    const tg_id = (await this.telegram.getTgUser()).user.id.toString();
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
