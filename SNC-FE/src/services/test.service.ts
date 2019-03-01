import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';



@Injectable()
export class TestService  {


 _url: string = "https://security-n-compliance.herokuapp.com"

  constructor(private http: HttpClient) { }

  updateAnswers(_id: String, answer: String): Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'Content-Type: application/json'});
    return this.http.put<any>(this._url+"/api/demo/"+_id,{Answer: answer});
  }

  writePDF(template: any): Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'Content-Type: application/json'});
  return  this.http.post<any>(this._url+"/api/demo/answerquestion",template) };


    sendPDF(filepath: String): Observable<any>{
      const headers = new HttpHeaders({'Content-Type': 'Content-Type: application/json'});
  return this.http.post<any>(this._url+"/api/demo/upload",{filepath: filepath, name: "fetest" });
}
  // getQueueAtLocation(location: string): Observable<Response>{
  //   const headers = new HttpHeaders({'Content-Type': 'Content-Type: application/json'});
  //   return this.http.get<Response>(this._url+'/'+location);
  // }








}
