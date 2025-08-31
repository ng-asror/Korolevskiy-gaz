import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Basket } from '../core';
import { map } from 'rxjs';

export const oformitGuard: CanActivateFn = () => {
  const router = inject(Router);
  const basketService = inject(Basket);
  return basketService.decoration$.pipe(
    map((res) => {
      if (res === null) {
        return true;
      } else {
        return router.createUrlTree(['/basket/oformit']);
      }
    })
  );
};
