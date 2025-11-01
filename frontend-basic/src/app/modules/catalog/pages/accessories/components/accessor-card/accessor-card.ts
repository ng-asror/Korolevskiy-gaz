import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { Accessor, Counter, Telegram } from '../../../../../../core';
import { firstValueFrom } from 'rxjs';
import { NumberPipe } from '../../../../../../pipe';
export interface IAccessorOne {
  id: number;
  uuid: string;
  title: string;
  price: string;
  image: any;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  image_url: any;
}
@Component({
  selector: 'app-accessor-card',
  imports: [NumberPipe],
  templateUrl: './accessor-card.html',
  styleUrl: './accessor-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessorCard {
  private accessorService = inject(Accessor);
  protected counterService = inject(Counter);
  private telegram = inject(Telegram);
  private cdk = inject(ChangeDetectorRef);

  getAccessor = input.required<IAccessorOne>({
    alias: 'accessor',
  });

  protected async kupit(product_id: number): Promise<void> {
    const tg_id = (await this.telegram.getTgUser()).user.id.toString();
    await firstValueFrom(this.accessorService.kupit(tg_id, product_id)).finally(
      () => {
        this.cdk.detectChanges();
      }
    );
  }

  protected async minus(product_id: number): Promise<void> {
    const tg_id = (await this.telegram.getTgUser()).user.id.toString();
    await firstValueFrom(this.accessorService.minus(tg_id, product_id))
      .then(() => {
        this.counterService.isCounted(product_id);
      })
      .finally(() => {
        this.cdk.detectChanges();
      });
  }
}
