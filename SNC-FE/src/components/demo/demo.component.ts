import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { TestService } from '@services/test.service';
@Component({
  selector: 'demo-root',
  templateUrl: './demo.component.html',
  providers: [TestService],
})
export class Demo implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private skeleService: TestService
  ) { }

  create: Boolean = false;
  get: Boolean = false;
  skeleForm: FormGroup;
  questions = ["5c73424df44fb900174f5720", "5c73424df44fb900174f5712", "5c73424df44fb900174f5722"];
  /*
  THIS IS THE OLD DEMO, NOTHING IMPORTANT HERE BUT THOUGHT IT WOULD BE GOOD TO LEAVE IN THE CODE
  */
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

  keys: String[];

  getState() {
    this.skeleService.getKeys().subscribe(data => {
this.keys = data.Keys, this.create = false,
      this.get = true
    });
  }

  goBack() {
    this.create = false;
    this.get = false;
  }

  formHandle(key: String) {
    this.skeleService.getForm(key).subscribe(data => {
      var newBlob = new Blob([data], { type: "application/pdf" });
      var fileURL = URL.createObjectURL(newBlob);
      console.log(fileURL);
      window.open(fileURL)
    });
  }

  fileURL: String;

  onSubmit() {
    this.skeleService.writePDF({ answers: this.skeleForm.value, folder: "DEMO", name: "test" }).subscribe(data => {
      this.fileURL = data.msg,
        console.log(this.fileURL)
    });
  }
}
