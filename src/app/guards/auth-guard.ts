import { UserService } from '@/services/user-service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (userService.isLoggedIn()) {
    return true;
  } else {
    return router.navigateByUrl('/admin');
  }
};
