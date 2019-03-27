import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SuperUser } from '@models/superUser.model';
import { Response } from '@models/response.model';



@Injectable({ providedIn: 'root' })
export class UserService  {
  private currentUserSubject: BehaviorSubject<SuperUser>;
    public currentUser: Observable<SuperUser>;
    private router: Router;


  constructor(private http: HttpClient) {
     this.currentUserSubject = new BehaviorSubject<SuperUser>(JSON.parse(localStorage.getItem('currentUser')));
     this.currentUser = this.currentUserSubject.asObservable();
 }
  _url: string = "https://security-n-compliance.herokuapp.com"
  //private _url: string = "http://localhost:3000/api";

  public get currentUserValue(): SuperUser {
        return this.currentUserSubject.value;
    }



    login(email: string, password: string):Observable<Response> {
        return this.http.post<Response>(this._url+"/login", {email, password});
    }

    register( password: string, email:string, address:string, company:string, telephone:string, fname:string, lname:string) {
        return this.http.post<Response>(this._url+"/register", {password, email, address, company, telephone, fname, lname}, { observe: 'response' });
    }

      callCheckAuth(): Observable<Response>{
      return this.http.get<Response>(this._url+"/superuser/auth", {withCredentials: true });

      }
      public adm: String;

      public isAuthenticated(): any{
        this.callCheckAuth().subscribe(data=>{this.adm = data.data[0] });
        return;
      }


    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

}
