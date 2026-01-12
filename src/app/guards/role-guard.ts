import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const expectedRole: string | undefined = route.data['role'];
  const userRole = auth.currentUserRole;

  // If no role is required, allow access
  if (!expectedRole) {
    return true;
  }

  // If role matches → allow
  if (userRole === expectedRole) {
    return true;
  }

  // If not → redirect to Forbidden page
  return router.parseUrl('/forbidden');
};
