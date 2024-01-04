import { ResolveFn } from '@angular/router';

export const clientResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
