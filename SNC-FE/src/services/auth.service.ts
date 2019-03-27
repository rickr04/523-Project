import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from '@models/response.model';
import { map } from 'rxjs/operators';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private router: Router;

    constructor(private http: HttpClient) {
          }


    //private _url = "http://localhost:3000/api/superuser/auth";
    private _url: string = "https://security-n-compliance.herokuapp.com/api/superuser/auth";



      callCheckAuth(): Observable<Response>{
      return this.http.get<Response>(this._url, {withCredentials: true });
      }

      public adm: String;

      public isAuthenticated(): any{
        this.callCheckAuth().subscribe(data=>{this.adm = data.data[0] });
        return;
      }



}
