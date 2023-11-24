import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { SellerService } from './Services/seller.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route : ActivatedRouteSnapshot, state : RouterStateSnapshot) => {
  const seller = inject(SellerService);
  if(localStorage.getItem('seller')){
    return true;
  }
  return seller.isSellerLoggedIn;
};
