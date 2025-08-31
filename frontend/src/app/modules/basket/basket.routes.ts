import { Routes } from '@angular/router';
import { oformitGuard } from '../../guards';

export const basketRoutes: Routes = [
  {
    path: 'basket',
    loadComponent: () => import('./basket').then((c) => c.Basket),
    children: [
      {
        path: '',
        canActivate: [oformitGuard],
        loadComponent: () => import('./pages').then((c) => c.Products),
      },
      {
        path: 'oformit',
        loadComponent: () => import('./pages').then((c) => c.Oformit),
      },
    ],
  },
];
