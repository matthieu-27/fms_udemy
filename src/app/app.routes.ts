import { Routes } from '@angular/router';
import { CourseList } from './course-list/course-list';

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
];
