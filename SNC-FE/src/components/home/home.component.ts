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

  questions = ["5c73424df44fb900174f5720", "5c73424df44fb900174f5712", "5c73424df44fb900174f5722"];

  ngOnInit() {
    this.skeleForm = this.formBuilder.group({

      c73424df44fb900174f5720: ['', Validators.required],
      c73424df44fb900174f5721: ['', Validators.required],
      c73424df44fb900174f5722: ['', Validators.required]
    });


  }
  get f() { return this.skeleForm.controls; }


  createState() {
    this.create = true;
    this.get = false;

  }

  getState() {
    this.create = false;
    this.get = true;

  }
  goBack() {
    this.create = false;
    this.get = false;

  }

fileURL: String;

  onSubmit() {
      this.skeleService.writePDF(this.skeleForm.value).subscribe(data => {
      this.fileURL= data.msg,
      console.log(this.fileURL),
      this.skeleService.sendPDF(this.fileURL).subscribe(res => { console.log(res.msg) });
  });



}







}
