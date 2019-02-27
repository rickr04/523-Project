import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';



@Injectable()
export class TestService  {

private _url: string = "TEMP"
//"https://beam-lasercutter.herokuapp.com/api/lasercutter"
//private _url: string = "http://localhost:3000/api/lasercutter"

  constructor(private http: HttpClient) { }

  updateAnswers(_id: String, answer: String): Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'Content-Type: application/json'});
    return this.http.put<any>(this._url+"/api/demo/"+_id,{Answer: answer});
  }

  // getQueueAtLocation(location: string): Observable<Response>{
  //   const headers = new HttpHeaders({'Content-Type': 'Content-Type: application/json'});
  //   return this.http.get<Response>(this._url+'/'+location);
  // }








}
