import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';







//import { LaserCutterService } from '@services/lasercutter.service';

@Component({
  selector: 'home-root',
  templateUrl: './home.component.html',
  providers: [],
})


export class Home implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder

    //private home: Home,
    //private account: Account,
  ) { }

  create: Boolean = false;
  get: Boolean = false;



  ngOnInit() {

  }

  createState(){
    this.create = true;
    this.get = false;

  }

  getState(){
    this.create = false;
    this.get = true;

  }
  goBack(){
    this.create = false;
    this.get = false;

  }







}
