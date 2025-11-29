import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  resource,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { LayoutService } from '../../core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.html',
  styleUrls: ['./roulette.scss'],
})
export class Roulette {
  private layoutService = inject(LayoutService);

  items = resource({
    loader: () =>
      firstValueFrom(this.layoutService.roulette_items()).then(
        (res) => res.data.data
      ),
  });

  // VARIABLES

  // VIEWCHILD
  @ViewChild('wheel') wheel!: ElementRef<HTMLDivElement>;
  @ViewChild('tringle') tringle!: ElementRef<HTMLDivElement>;

  protected spin(): void {
    const duration = 5;
    const extra_rotation = 360 * 5;
    const random_stop = Math.abs(Math.random() * 360);

    gsap.to(this.wheel.nativeElement, {
      rotate: extra_rotation + random_stop,
      duration,
      ease: 'power3.out',
      onComplete: () => {
        this.check_pointer();
      },
    });
  }

  check_pointer(): void {
    const arrow = this.tringle.nativeElement;
    const rect = arrow.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const el = document.elementFromPoint(centerX, centerY);
    if (el) {
      const data_index = el.getAttribute('data-index');
      console.log(data_index);
    }
  }
}
