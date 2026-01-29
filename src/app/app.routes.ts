import { Routes } from '@angular/router';
import { CourseList } from './course-list/course-list';
import { Cart } from './cart/cart';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full'
  },
  {
    path: 'courses',
    component: CourseList,
  },
  {
    path: 'cart',
    component: Cart,
  },
];
