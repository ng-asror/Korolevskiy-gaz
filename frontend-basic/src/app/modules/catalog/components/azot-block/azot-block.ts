import { CommonModule, NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { IAzot } from '../../../../core/interfaces/azot';
import { NumberPipe } from '../../../../pipe';

@Component({
  selector: 'app-azot-block',
  imports: [NgClass, NgForOf, NgIf, CommonModule, NumberPipe],
  templateUrl: './azot-block.html',
  styleUrl: './azot-block.scss',
})
export class AzotBlock {
  protected desc = signal<boolean>(false);
  azotInfo = input.required<IAzot | null>({ alias: 'azot' });

  protected descToggle(): void {
    this.desc.update((desc) => !desc);
  }
}
