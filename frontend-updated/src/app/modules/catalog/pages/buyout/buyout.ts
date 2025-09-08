import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Azot, Counter, Telegram } from '../../../../core';
import { IAzot } from '../../../../core/interfaces/azot';
import { AzotBlock } from '../../components';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { NumberPipe } from '../../../../pipe';

@Component({
  selector: 'app-buyout',
  imports: [
    AzotBlock,
    NgIf,
    RouterLink,
    NumberPipe,
    NgFor,
    AsyncPipe,
    RouterLinkActive,
  ],
  templateUrl: './buyout.html',
  styleUrl: './buyout.scss',
})
export class Buyout {
  private azotsService = inject(Azot);
  protected counter = inject(Counter);
  private telegram = inject(Telegram);
  constructor(private router: Router) {}
  protected azotInfo = signal<IAzot | null>(null);
  protected liters$ = this.azotsService.liters.asObservable();
  tg_id: string = '';
  async ngOnInit(): Promise<void> {
    await firstValueFrom(this.azotsService.getAzots('Выкуп')).then((res) => {
      this.router.navigate([], {
        queryParams: { liter: res.data.data[0].id },
      });
      this.selectAzot(res.data.data[0].id);
    });
    this.tg_id = await this.telegram.getUserLocalId();
  }
  protected async selectAzot(id: number): Promise<void> {
    await firstValueFrom(this.azotsService.getAzotInfo(id)).then((res) => {
      this.azotInfo.set(res);
    });
  }

  protected async kupit(
    product_id: number,
    product_typ_id: number
  ): Promise<void> {
    await firstValueFrom(
      this.azotsService.kupit(this.tg_id, product_id, product_typ_id)
    );
  }

  protected async minus(
    product_id: number,
    product_type_id: number
  ): Promise<void> {
    const tg_id = await this.telegram.getUserLocalId();
    await firstValueFrom(
      this.azotsService.minus(tg_id, product_id, product_type_id)
    ).then(() => {
      this.counter.isCounted(product_type_id);
    });
  }
}
