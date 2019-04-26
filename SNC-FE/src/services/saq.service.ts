import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SuperUser } from '@models/superUser.model';
import { Response } from '@models/response.model';
import { ResponseA } from '@models/responseA.model';
import { SAQEnum } from '@models/saqEnum.enum';
@Injectable({ providedIn: 'root' })
export class SAQService {
  private router: Router;
  constructor(private http: HttpClient) { }

  //private _url: string = "https://security-n-compliance.herokuapp.com/api"
  private _url: string = "http://localhost:3000/api";

  /*
  retrieves user _id from local storage
  */
  private getFromLocal() {
    return localStorage.getItem("_id");
  }
  /*
  retrieves SAQ questions and current answers for questions (if any)
  */
  getSAQ(saqType: String): Observable<ResponseA> {
    return this.http.get<ResponseA>(this._url + "/SAQ/" + this.getFromLocal() + "/getsaq/" + saqType);
  }
  /*
  saves SAQ on backend/database and instructs backend to generate pdf
  */
  submitSAQ(template: String, saqform: any): Observable<Response> {
    return this.http.post<Response>(this._url + "/SAQ/" + this.getFromLocal() + '/completesaq/' + template, { answers: saqform });
  }
  /*
  Saves SAQ on backend/database
  */
  saveSAQ(template: String, saqform: any): Observable<Response> {
    return this.http.post<Response>(this._url + "/SAQ/" + this.getFromLocal() + '/completesaq/' + template, { answers: saqform, action: "save" });
  }
  /*
  retrieves PDF keys from S3 based off of the user _id and the SAQ type
  */
  getKeys(template: String): Observable<Response> {
    return this.http.get<Response>(this._url + "/SAQ/" + this.getFromLocal() + '/getkeys/' + template);
  }
  /*
  retrieves CCW questions and current answers (if any) from backend
  */
  getCCW(): Observable<Response> {
    return this.http.get<Response>(this._url + "/SAQ/" + this.getFromLocal() + '/getccw');
  }
  /*
  submits the ccw form to be updated on the backend.
  */
  submitCCW(ccw: any[], id: string): Observable<Response> {
    return this.http.post<Response>(this._url + "/SAQ/" + this.getFromLocal() + '/submitccw', { _id: id, data: ccw });
  }
  /*
  calls for CCW.xlsx file from backend
  */
  ccwURL() {
    return this._url + "/SAQ/" + this.getFromLocal() + '/downloadccw';
  }
  /*
  retrieves pdfs from backed
  */
  getForm(key: String): Observable<ArrayBuffer> {
    return this.http.post(this._url + '/SAQ/getform', { key: key }, { responseType: 'arraybuffer' });
  }
  /*
  function that tears apart strings that are the question _id's and sorts them based
  off of sections between the '.'s and casts numbers to numbers
  */
  sort(data: any) {
    return data.data.sort((n1, n2) => {
      var first = n1.question._id.split(".");
      var second = n2.question._id.split(".");
      var len = Math.max(first.length, second.length);
      for (var i = 0; i < len; i++) {
        if (isNaN(first[i]) && isNaN(second[i])) {
          if (first[i] > second[i]) {
            return 1;
          }
          else if (first[i] < second[i]) {
            return -1;
          }
        }
        else if (isNaN(first[i]) && !isNaN(second[i])) {
          return -1;
        }
        else if (!isNaN(first[i]) && isNaN(second[i])) {
          return 1;
        }
        else {
          if (Number(first[i]) > Number(second[i])) {
            return 1;
          }
          if (Number(first[i]) < Number(second[i])) {
            return -1;
          }
        }
      }
      return 0;
    });
  }

}
