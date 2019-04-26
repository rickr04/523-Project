import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
@Injectable()
export class TestService {
  //_url: string = "https://security-n-compliance.herokuapp.com"
  _url: string = "http://localhost:3000"
  /*
  DEMO SERVICE NOTHING HERE OUT OF THE ORDINARY
  */
  constructor(private http: HttpClient) { }
  updateAnswers(_id: String, answer: String): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'Content-Type: application/json' });
    return this.http.put<any>(this._url + "/api/demo/" + _id, { Answer: answer });
  }
  writePDF(template: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'Content-Type: application/json' });
    return this.http.post<any>(this._url + "/api/demo/12345/answerquestion", template)
  };
  sendPDF(stream: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'Content-Type: application/json' });
    return this.http.post<any>(this._url + "/api/demo/upload", stream);
  }
  getKeys(): Observable<any> {
    return this.http.get<any>(this._url + '/api/demo/DEMO/getkeys');
  }
  getForm(key: String): Observable<ArrayBuffer> {
    return this.http.post(this._url + '/api/demo/getform', { Key: key }, { responseType: 'arraybuffer' });
  }
}
