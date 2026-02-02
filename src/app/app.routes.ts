import { Routes } from '@angular/router';
import { AdminPage } from './admin-page/admin-page';
import { Cart } from './cart/cart';
import { Checkout } from './checkout/checkout';
import { CourseList } from './course-list/course-list';
import { Home } from './home/home';
import { PageNotFound } from './page-not-found/page-not-found';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'courses',
    component: CourseList,
  },
  {
    path: 'cart',
    component: Cart,
  },
  {
    path: 'checkout',
    component: Checkout,
  },
  {
    path: 'admin',
    component: AdminPage,
  },
  {
    path: '**',
    component: PageNotFound,
  },
];
