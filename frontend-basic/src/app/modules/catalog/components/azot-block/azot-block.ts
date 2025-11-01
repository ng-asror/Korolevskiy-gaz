import { CommonModule, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { IAzot } from '../../../../core/interfaces/azot';
import { NumberPipe } from '../../../../pipe';

@Component({
  selector: 'app-azot-block',
  imports: [NgClass, CommonModule, NumberPipe],
  templateUrl: './azot-block.html',
  styleUrl: './azot-block.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AzotBlock {
  protected desc = signal<boolean>(false);
  azotInfo = input.required<IAzot['data'] | null>({ alias: 'azot' });

  protected descToggle(): void {
    this.desc.update((desc) => !desc);
  }
}
