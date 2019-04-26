import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserService } from '@services/user.service';
import { AuthenticationService } from '@services/auth.service';
@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class Login implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private skeleService: UserService,
    private auth: AuthenticationService,
  ) { }
  submitted = false;
  loaded: boolean;
  skeleForm: FormGroup;
  /*
  on initial load, component checks if user is already logged in, if so they are directed home,
  if not the component generates a login form
  */
  ngOnInit() {
    this.loaded = false;
    this.auth.callCheckAuth().subscribe(data => {
      if (data.data[0] == "true") {
        this.router.navigateByUrl('/home');
      } else {
        this.skeleForm = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(8)]]
        });
        this.loaded = true;
      }
    })
  }
  /*
  get function for easily accessing form inputs
  */
  get form() { return this.skeleForm.controls };
  /*
  checks if the form is valid, if not it returns and loads validators on the screen (missing info, passwords don't match)
  if it is valid it calls our backend to submit email and password, stores the user._id in local storage, and navigates home
  */
  onSubmit() {
    this.submitted = true;
    if (this.skeleForm.invalid) {
      return;
    }
    this.skeleService.login(this.skeleForm.controls.email.value, this.skeleForm.controls.password.value).subscribe(data => {
      localStorage.setItem('_id', data.data._id),
        this.auth.callCheckAuth().subscribe(data => {
          this.auth.isAuthenticated(),
            this.router.navigateByUrl('/home'),
            this.router.navigateByUrl('/home')
        })
    });
  }
}
