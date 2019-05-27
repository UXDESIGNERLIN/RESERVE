import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SessionService } from '../services/session.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private sessionService: SessionService,
              private router: Router) {}

  url: string;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean { 
    this.url = state.url;
    return this.checkLogin();      
  }

  checkLogin(): Observable<boolean> {
    return this.sessionService.getSession().pipe(
      map(
        (session) => {
          if(!session.loggedIn) {
            this.router.navigateByUrl('/login');
          }
          return session.loggedIn;
        }
      )
    )
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean { 
    return this.canActivate(next, state);
  }
}
