import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';



@Injectable()
export class TestService  {

  // _url: string = "https://security-n-compliance.herokuapp.com"
  _url: string = "http://localhost:3000"

}
