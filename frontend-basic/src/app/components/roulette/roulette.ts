import {
  Component,
  ElementRef,
  inject,
  OnInit,
  resource,
  signal,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { LayoutService, Telegram } from '../../core';
import { firstValueFrom } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.html',
  styleUrls: ['./roulette.scss'],
  imports: [AsyncPipe],
})
export class Roulette implements OnInit {
  private layoutService = inject(LayoutService);
  private telegram = inject(Telegram);
  private router = inject(Router);

  // VARIABLES
  order_id!: number;
  tg_id!: number;
  protected can_spin$ = this.layoutService.canSpin$;
  protected can_spin_order$ =
    this.layoutService.canSpinOrderSubject.asObservable();
  // SIGNALS
  protected spin_btn = signal<boolean>(true);
  protected prize = signal<{
    title: string;
    img: string;
    desc: string | null;
  } | null>(null);

  items = resource({
    loader: () =>
      firstValueFrom(this.layoutService.roulette_items()).then(
        (res) => res.data.data
      ),
  });

  // VIEWCHILD
  @ViewChild('wheel') wheel!: ElementRef<HTMLDivElement>;
  @ViewChild('giftModal') giftModal!: ElementRef<HTMLDialogElement>;

  async ngOnInit(): Promise<void> {
    this.can_spin_order$.subscribe((res) => console.log(res));
    this.tg_id = (await this.telegram.getTgUser()).user.id;

    this.layoutService.canSpin$.subscribe((res) => {
      if (!res.order_id) return;
      this.order_id = res.order_id;
    });

    this.giftModal.nativeElement.showModal();
  }

  protected async spin_roulette(): Promise<void> {
    const items = this.items.value()?.slice(0, 10);
    if (!items) return;
    const select_id = await this.spin();

    const index = items.findIndex((i) => i.id === select_id);

    if (index === -1) return;

    const sector_angle = 360 / 10;
    const stop_angle = 360 - index * sector_angle;
    const rotate = 360 * 5 + stop_angle;
    this.gsap_spin(rotate);
  }

  private async spin(): Promise<number | null> {
    if (!this.order_id && !this.tg_id) return null;
    const res = await firstValueFrom(
      this.layoutService.spin(this.order_id, String(this.tg_id))
    );
    const gift = res.data.prize;
    this.prize.set({
      title: gift.accessory ? gift.accessory.title : gift.title,
      img: gift.accessory ? gift.accessory.image_url : gift.image_url,
      desc: gift.description,
    });
    this.spin_btn.set(false);
    return gift.id;
  }

  private gsap_spin(rotate: number): void {
    gsap.to(this.wheel.nativeElement, {
      rotate,
      duration: 5,
      overwrite: 'auto',
      ease: 'power3.out',
      onComplete: () => {
        this.layoutService.canSpinSubject.next({ spin: false });
        this.telegram.hapticFeedback('soft');
        this.giftModal.nativeElement.showModal();
      },
    });
  }
  protected closeGift(): void {
    this.giftModal.nativeElement.close();
    this.spin_btn.set(true);
    this.router.navigate(['/orders']);
  }
}
