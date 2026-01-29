import { Routes } from '@angular/router';
import { Cart } from './cart/cart';
import { Checkout } from './checkout/checkout';
import { CourseList } from './course-list/course-list';
import { Home } from './home/home';

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
];
