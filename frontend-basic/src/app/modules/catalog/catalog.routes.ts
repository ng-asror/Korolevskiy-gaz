import { Routes } from '@angular/router';

export const catalogRoutes: Routes = [
  {
    path: 'catalog',
    loadComponent: () => import('./catalog').then((m) => m.Catalog),
    children: [
      {
        path: 'azots',
        loadComponent: () => import('./pages').then((c) => c.Azots),
      },
      {
        path: 'accessories',
        loadComponent: () => import('./pages').then((c) => c.Accessories),
      },
      {
        path: 'buyout',
        loadComponent: () => import('./pages').then((c) => c.Buyout),
      },
      {
        path: '',
        redirectTo: 'azots',
        pathMatch: 'full',
      },
    ],
  },
];
