import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uzPrice',
})
export class NumberPipe implements PipeTransform {
  transform(value: unknown): number | string {
    if (!value) return 0;
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}
