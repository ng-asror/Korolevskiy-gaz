import { Component, input } from '@angular/core';
import { NumberPipe } from '../../../../pipe';
import { IOrderAccessor, IOrderAzot } from '../../../../core/interfaces';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [NumberPipe, NgIf, NgClass],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  getProduct = input.required<{
    product: IOrderAccessor | IOrderAzot;
    productType: 'azot' | 'accessor';
  }>({
    alias: 'product',
  });
}
