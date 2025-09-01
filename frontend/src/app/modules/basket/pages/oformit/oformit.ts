import { Component, inject, OnInit, resource, signal } from '@angular/core';
import { Basket, LayoutService, Order, Telegram } from '../../../../core';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
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
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    OformitCard,
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
  allCount = this.basketService.decorationProductCount();
  slugIds = new Map<string, { name: string; price: number }>();
  oplata_type = signal<'Переводом' | 'Наличные'>('Наличные');
  slugPrice = signal<number>(0);
  updates = this.layoutService.updates;
  orderInfo: FormGroup;
  constructor(private fb: NonNullableFormBuilder, private router: Router) {
    this.orderInfo = this.fb.group({
      phone: this.fb.control('', { validators: Validators.required }),
      adress: this.fb.control('', { validators: Validators.required }),
      comment: this.fb.control(''),
      cargo_with: this.fb.control(false),
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
    const adress = await this.telegram.getCloudStorage('adress');

    this.orderInfo.patchValue({
      phone: phone ?? null,
      adress: adress ?? null,
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
      this.telegram.setCloudItem('adress', this.orderInfo.get('adress')?.value);
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
          this.router.navigate(['/orders']);
        }
      );
    }
  }
}
