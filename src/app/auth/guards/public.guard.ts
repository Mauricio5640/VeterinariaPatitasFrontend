import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private checkAuthStatus(): Observable<boolean | UrlTree> {
    return this.authService.checkAuthentication()
      .pipe(
        map(isAuthenticated => {
          if (isAuthenticated) {
            return this.router.createUrlTree(['/veterinaria/home']);
          } else {
            return true;
          }
        })
      );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthStatus();
  }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthStatus();
  }

}
