import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserService } from '@services/user.service';
import { AuthenticationService } from '@services/auth.service';









@Component({
  selector: 'register-root',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService, AuthenticationService],
})


export class Register implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private skeleService: UserService,
    private auth: AuthenticationService

  ) { }
  skeleForm: FormGroup;
  notMatch = false;
  loaded:boolean=true;
  questions = ["first", "last", "email", "address", "company", "phone", "password", "passConf"];
  submitted = false;

  ngOnInit() {
    this.skeleForm = this.formBuilder.group({

      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      company: ['', Validators.required],
      telephone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passConf: ['', [Validators.required, Validators.minLength(8)]]
    });


  }

  onSubmit() {
    this.submitted = true;
    if (!this.confirmPassword(this.skeleForm)) {
      this.notMatch = true;
      return;
    }
    if (this.skeleForm.invalid) {
      return;
    }

    this.skeleService.register(
      this.skeleForm.controls.password.value,
      this.skeleForm.controls.email.value,
      this.skeleForm.controls.address.value,
      this.skeleForm.controls.company.value,
      this.skeleForm.controls.telephone.value,
      this.skeleForm.controls.fname.value,
      this.skeleForm.controls.lname.value,
    ).subscribe(data => {
      localStorage.setItem('_id', data.data._id),
      this.auth.callCheckAuth().subscribe(data => {
          this.auth.isAuthenticated(),
          this.loaded=false;
          this.delay(3000).then(any=>{
            this.router.navigateByUrl('/home'),
            this.router.navigateByUrl('/home')
            });

      }
      )
    }
    );


  }
  async delay(ms: number) {
      await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }
  get form() { return this.skeleForm.controls };

  confirmPassword(form: FormGroup) {
    let password = form.controls.password.value;
    let passConf = form.controls.passConf.value;

    if (password == passConf) {

      return true;
    }
    else {

      return false;
    }
  }



}
