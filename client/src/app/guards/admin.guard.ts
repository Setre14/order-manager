import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { Role } from '../../../../shared';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const oAllowed: Observable<boolean> = new Observable(allowed => {
        this.userService.isLoggedIn().then(isLoggedIn => {
          if (!isLoggedIn) {
            this.router.navigate(['/auth/login'], {
              queryParams: {
                return: state.url
              }
            });
            allowed.next(false);
          } else {
            const isAdmin = this.userService.curUser.role == Role.ADMIN;

            // if (!isAdmin) {
            //   this.router.navigate([''], {
            //     queryParams: {
            //       return: state.url
            //     }
            //   });
            // }

            allowed.next(isAdmin);
          }
          allowed.complete();
        })
      });

      return oAllowed;
  }
  
}
