import { Component, inject, OnInit, resource, signal } from '@angular/core';
import { Basket, LayoutService, Order, Telegram } from '../../../../core';
import { AsyncPipe, CommonModule, DatePipe, NgClass } from '@angular/common';
import { OformitCard } from '../../components/oformit-card/oformit-card';
import { NumberPipe } from '../../../../pipe';
import { firstValueFrom } from 'rxjs';
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { createMask, InputMaskModule } from '@ngneat/input-mask';
import { IOrderFinishReq } from '../../../../core/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oformit',
  imports: [
    AsyncPipe,
    CommonModule,
    FormsModule,
    OformitCard,
    ReactiveFormsModule,
    DatePipe,
    NumberPipe,
    InputMaskModule,
  ],
  templateUrl: './oformit.html',
  styleUrl: './oformit.scss',
})
export class Oformit implements OnInit {
  private basketService = inject(Basket);
  private orderService = inject(Order);
  private layoutService = inject(LayoutService);
  private telegram = inject(Telegram);
  protected decoration$ = this.basketService.decoration$;
  slugIds = new Map<string, { name: string; price: number }>();
  oplata_type = signal<'Переводом' | 'Наличные'>('Наличные');
  slugPrice = signal<number>(0);
  protected allCount = signal<number>(0);
  updates = this.layoutService.updates;
  orderInfo: FormGroup;
  constructor(private fb: NonNullableFormBuilder, private router: Router) {
    this.orderInfo = this.fb.group({
      phone: this.fb.control('', { validators: Validators.required }),
      address: this.fb.control('', { validators: Validators.required }),
      comment: this.fb.control(''),
      cargo_with: this.fb.control(false),
    });
    this.decoration$.subscribe((res) => {
      if (res) {
        const azotCount = res.azots.reduce(
          (count, items) => count + items.count,
          0
        );
        const accessorCount = res.accessories.reduce(
          (count, items) => count + items.count,
          0
        );
        this.allCount.set(accessorCount + azotCount);
      }
    });
  }

  phoneMask = createMask({
    mask: '+7 (999) 999-9999',
    placeholder: '_',
    clearIncomplete: true,
  });

  services = resource({
    loader: () => firstValueFrom(this.orderService.getServices()),
  });

  protected cargo_with(cargo_price: number, event: Event): void {
    const input = event.target as HTMLInputElement;

    this.slugPrice.update((current) =>
      input.checked ? current + +cargo_price : current - +cargo_price
    );
  }
  async ngOnInit(): Promise<void> {
    const phone = await this.telegram.getCloudStorage('phone');
    const address = await this.telegram.getCloudStorage('address');

    this.orderInfo.patchValue({
      phone: phone ?? null,
      address: address ?? null,
    });
  }

  /**
   *
   * @param id
   * @param name
   * @param price
   */
  slugCalc(id: string, name: string, price: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (this.slugIds.has(id)) {
      this.slugIds.delete(id);
    } else {
      this.slugIds.set(id, { name, price: Number(price) });
    }
    this.slugPrice.update((slug_price) =>
      input.checked ? slug_price + +price : slug_price - +price
    );
  }

  async oformit(id: number): Promise<void> {
    if (this.orderInfo.valid) {
      const formValue = this.orderInfo.getRawValue();
      this.telegram.setCloudItem('phone', this.orderInfo.get('phone')?.value);
      this.telegram.setCloudItem(
        'address',
        this.orderInfo.get('address')?.value
      );
      const currentServices: number[] = Array.from(this.slugIds.keys()).map(
        (item) => Number(item)
      );
      const data: IOrderFinishReq = {
        ...formValue,
        payment_type: this.oplata_type(),
        service_ids: currentServices,
      };
      await firstValueFrom(this.orderService.ofotmitFinish(id, data)).then(
        () => {
          this.basketService.decorationNext(null);
          this.router.navigate(['/orders']);
        }
      );
    } else {
      this.telegram.showAlert(
        'Пожалуйста, введите ваш номер телефона и адрес.'
      );
    }
  }
}
