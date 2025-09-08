import { Component, inject, resource } from '@angular/core';
import { AccessorCard } from './components';
import { firstValueFrom } from 'rxjs';
import { Accessor } from '../../../../core';
import { NgForOf, NgIf } from '@angular/common';
import { SkletonCard } from '../../../../components';
@Component({
  selector: 'app-accessories',
  imports: [AccessorCard, NgForOf, NgIf, SkletonCard],
  templateUrl: './accessories.html',
  styleUrl: './accessories.scss',
})
export class Accessories {
  private accessorService = inject(Accessor);
  protected accessor = resource({
    loader: () => firstValueFrom(this.accessorService.getAccessors()),
  });
}
