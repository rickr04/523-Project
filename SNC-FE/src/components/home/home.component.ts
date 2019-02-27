import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { TestService } from '@services/test.service';








//import { LaserCutterService } from '@services/lasercutter.service';

@Component({
  selector: 'home-root',
  templateUrl: './home.component.html',
  providers: [TestService],
})


export class Home implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private skeleService: TestService
    //private home: Home,
    //private account: Account,
  ) { }

  create: Boolean = false;
  get: Boolean = false;
  skeleForm: FormGroup;

  questions = ["5c73424df44fb900174f5720","5c73424df44fb900174f572", "5c73424df44fb900174f5722"];

  ngOnInit() {
    this.skeleForm = this.formBuilder.group({
      Q1: ['', Validators.required],
      Q2: ['', Validators.required],
      Q3: ['', Validators.required]
    });


  }
  get f() { return this.skeleForm.controls; }


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

  onSubmit() {
    for(var i = 1; i<4; i++){
      var question = 'Q'+i.toString()



      this.skeleService.updateAnswers(this.questions[i-1],  this.skeleForm.controls[question].value).subscribe(data=>{console.log(data.answer)});

    }
  }







}
