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
  ngOnInit() {
    this.loaded=false;
    this.auth.callCheckAuth().subscribe(data=>{
      if(data.data[0] == "true"){

      this.router.navigateByUrl('/account');

    }else{

      this.skeleForm = this.formBuilder.group({
        // Ask about naming conventions
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]]
      });
      this.loaded=true;
    }
  })



  }


  get form() { return this.skeleForm.controls };


  onSubmit() {
    this.submitted = true;
    if (this.skeleForm.invalid) {
      return;
    }
    this.skeleService.login(this.skeleForm.controls.email.value, this.skeleForm.controls.password.value).subscribe(data => {
      localStorage.setItem('_id', data.data._id),
        this.auth.callCheckAuth().subscribe(data => {
          this.auth.isAuthenticated(),
            this.router.navigateByUrl('/account'),
            this.router.navigateByUrl('/account')
        })
    });


  }


}
