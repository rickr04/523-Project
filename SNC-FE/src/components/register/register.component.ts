import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { TestService } from '@services/test.service';








@Component({
  selector: 'register-root',
  templateUrl: './register.component.html',
  providers: [TestService],
})


export class Register implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private skeleService: TestService

  ) {  }
  skeleForm: FormGroup;


  questions = ["first", "last", "email", "address", "company", "phone", "password", "passConf"];
  submitted = false;

  ngOnInit() {
    this.skeleForm = this.formBuilder.group({

      first: ['', Validators.required],
      last: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      company: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passConf: ['', [Validators.required, Validators.minLength(8)]]
    });


  }

  onSubmit() {
    this.submitted = true;
    if(this.skeleForm.invalid){
      return;
    }
      console.log(this.skeleForm.value),
      this.router.navigateByUrl('/account')

}

  get form(){return this.skeleForm.controls};

confirmPassword(form: FormGroup){
  let password = form.controls.password.value;
  let passwordConf = form.controls.passwordConf.value;

  if(password == passwordConf){
    return true;
  }
  else{
    return false;
  }
}



}
