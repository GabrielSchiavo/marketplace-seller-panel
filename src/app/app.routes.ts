import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Products } from './pages/products/products';
import { NewProduct } from './pages/new-product/new-product';
import { Layout } from './pages/layout/layout';
import { authGuard } from './guards/auth-guard';
import { loginAuthGuard } from './guards/login-auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    canActivate: [loginAuthGuard],
  },
  {
    path: '',
    component: Layout,
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'products',
        component: Products,
      },
      {
        path: 'new-product',
        component: NewProduct,
      }
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
