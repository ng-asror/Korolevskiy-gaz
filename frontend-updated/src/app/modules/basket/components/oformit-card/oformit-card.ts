import { Component, input } from '@angular/core';
import { IOrderAccessor, IOrderAzot } from '../../../../core/interfaces';
import { NgClass, NgIf } from '@angular/common';
import { NumberPipe } from '../../../../pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-oformit-card',
  imports: [NgIf, NumberPipe, NgClass, FormsModule],
  templateUrl: './oformit-card.html',
  styleUrl: './oformit-card.scss',
})
export class OformitCard {
  getProduct = input.required<{
    product: IOrderAzot | IOrderAccessor;
    productType: 'azot' | 'accessor';
  }>({
    alias: 'product',
  });
}
