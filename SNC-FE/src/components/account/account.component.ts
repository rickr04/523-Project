import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { TestService } from '@services/test.service';








//import { LaserCutterService } from '@services/lasercutter.service';

@Component({
  selector: 'account-root',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [TestService],
})


export class Account implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  ngOnInit() {



  }





}
