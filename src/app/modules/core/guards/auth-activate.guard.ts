import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const isLoggedIn = inject(AuthService).isLoggedIn();
  return isLoggedIn ? isLoggedIn : inject(Router).createUrlTree(['/logowanie']);
};
