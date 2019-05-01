import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@services/auth.service';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { timer } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthenticationService
  ) { }
  global: boolean;
  /*
  ROUTE GUARD built to prevent unauthenticated visitors from visiting routes other than
  login, register, and welcome. if they try to they are routed to login
  Is one big promise, while it is checking the application will hang up but never more than
  .5 seconds
  */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    this.auth.adm;
    return this.auth.callCheckAuth().pipe(map(data => {
      this.auth.adm = data.data[0],
        this.auth.isAuthenticated();
      if (!this.auth.adm) {
        this.router.navigate(['login']);
        return false;
      } else if (this.auth.adm == "true") {
        return true;
      }
    }));
  }
}
