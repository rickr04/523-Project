import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { TestService } from '@services/test.service';





@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  providers: [TestService],
})


export class Login implements OnInit {


    constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private skeleService: TestService
    ) { }
    submitted = false;
    skeleForm: FormGroup;
    ngOnInit() {
      this.skeleForm = this.formBuilder.group({
        // Ask about naming conventions
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]]
      });


    }


    get form(){return this.skeleForm.controls};


    onSubmit() {
        this.submitted = true;
        if(this.skeleForm.invalid){
          return;
        }
        console.log(this.skeleForm.value),
        this.router.navigateByUrl('/account');
  }


}
