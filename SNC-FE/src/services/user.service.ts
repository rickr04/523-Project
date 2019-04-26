import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SuperUser } from '@models/superUser.model';
import { Response } from '@models/response.model';
import { ResponseA } from '@models/responseA.model';
@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUserSubject: BehaviorSubject<SuperUser>;
  public currentUser: Observable<SuperUser>;
  private router: Router;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<SuperUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  //private _url: string = "https://security-n-compliance.herokuapp.com/api"
  private _url: string = "http://localhost:3000/api";

  public get currentUserValue(): SuperUser {
    return this.currentUserSubject.value;
  }
  /*
  get user _id from local storage
  */
  private getFromLocal() {
    return localStorage.getItem("_id");
  }
  /*
  sends email and password to backend to be logged in
  */
  login(email: string, password: string): Observable<Response> {
    return this.http.post<Response>(this._url + "/login", { email, password });
  }
  /*
  sends user information from registration to backend to be registered and logged in, reshapes data to fit schema
  */
  register(password: string, email: string, address: string, company: string, telephone: string, fname: string, lname: string, city: string, state: string, zipcode: string, dba: string, url: string): Observable<Response> {
    let info = { city, state, zipcode, dba, url };
    return this.http.post<Response>(this._url + "/register", { password, email, address, company, telephone, fname, lname, info });
  }
  /*
  calls to see if authenticated
  */
  callCheckAuth(): Observable<ResponseA> {
    return this.http.get<Response>(this._url + "/superuser/auth", { withCredentials: true });
  }
  public adm: String;
  public isAuthenticated(): any {
    this.callCheckAuth().subscribe(data => { this.adm = data.data[0] });
    return;
  }
  /*
  gets super user information from backend
  */
  getSuper(): Observable<Response> {
    return this.http.get<Response>(this._url + "/superuser/find/" + this.getFromLocal(), { withCredentials: true });
  }
  /*
  call that sends information to backend to change password
  */
  changePassword(oldPass: String, newPass: String): Observable<Response> {
    let _id = this.getFromLocal();
    return this.http.post<Response>(this._url + "/superuser/update/password", { _id: _id, old: oldPass, new: newPass }, { withCredentials: true });
  }
  /*
  logout
  */
  logout() {
    localStorage.removeItem('_id');
  }
  /*
  call to create/register a subuser
  */
  subuser(password: string, email: string, telephone: string, fname: string, lname: string, saqtemplates: string[]): Observable<Response> {
    return this.http.post<Response>(this._url + "/registersub/" + this.getFromLocal(), { password, email, telephone, fname, lname, saqtemplates });
  }
  getUser(_id: string): Observable<Response> {
    return this.http.get<Response>(this._url + "/superuser/find/" + _id);
  }
}
