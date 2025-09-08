import { Routes } from '@angular/router';
import { catalogRoutes } from './modules/catalog/catalog.routes';
import { basketRoutes } from './modules/basket/basket.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout').then((l) => l.Layout),
    children: [
      {
        path: 'orders',
        loadComponent: () =>
          import('./modules/orders/orders').then((c) => c.Orders),
      },
      ...catalogRoutes,
      ...basketRoutes,
      {
        path: '',
        redirectTo: 'catalog',
        pathMatch: 'full',
      },
    ],
  },
];
