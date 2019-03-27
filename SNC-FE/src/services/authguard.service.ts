import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@services/auth.service';
import { first } from 'rxjs/operators';
//import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';
import { timer } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthenticationService
  ) { }


  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.auth.isAuthenticated();
    console.log(this.auth.adm);
    if (this.auth.adm == "false") {
      this.router.navigate(['login']);
      return false;
    } else if (this.auth.adm == "true") {
      return true;
    }
  }
}
