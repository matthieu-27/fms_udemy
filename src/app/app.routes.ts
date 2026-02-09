import { Routes } from '@angular/router';
import { AdminPage } from './admin-page/admin-page';
import { ProfilePage } from './admin-page/profile-page/profile-page';
import { Cart } from './cart/cart';
import { Checkout } from './checkout/checkout';
import { CourseList } from './course-list/course-list';
import { authGuard } from './guards/auth-guard';
import { Home } from './home/home';
import { PageNotFound } from './page-not-found/page-not-found';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    pathMatch: 'full',
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
    canActivate: [authGuard],
    component: Checkout,
  },
  {
    path: 'admin',
    component: AdminPage,
  },
  {
    path: 'adminpage/:id',
    canActivate: [authGuard],
    component: ProfilePage,
  },
  {
    path: '**',
    component: PageNotFound,
  },
];
