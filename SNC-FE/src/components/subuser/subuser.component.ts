import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { SAQEnum } from '@models/saqEnum.enum';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserService } from '@services/user.service';
import { AuthenticationService } from '@services/auth.service';
@Component({
  selector: 'sub-root',
  templateUrl: './subuser.component.html',
  styleUrls: ['./subuser.component.css'],
  providers: [UserService, AuthenticationService],
})
export class Subuser implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private subuserService: UserService,
    private auth: AuthenticationService
  ) { }
  subuserForm: FormGroup;
  notMatch = false;
  loaded: boolean = true;
  enum = SAQEnum;
  typeTemplate: String;
  saqs = ["A", "AEP", "B", "BIP", "C", "CVT", "D Merchant", "D Service", "P2PE"];
  submitted = false;
  /*
  on initial load, component generates form for registering a new subuser
  */
  ngOnInit() {
    this.subuserForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passConf: ['', [Validators.required, Validators.minLength(8)]],
      saqs: this.formBuilder.array([])
    });
  }
  /*
  get enum value from form response value
  */
  getEnum(type: String) {
    if (type == "A") {
      this.typeTemplate = "A";
      return this.enum.A;
    }
    else if (type == "AEP") {
      this.typeTemplate = "AEP";
      return this.enum.AEP;
    } else if (type == "B") {
      this.typeTemplate = "B";
      return this.enum.B;
    } else if (type == "BIP") {
      this.typeTemplate = "BIP";
      return this.enum.BIP;
    } else if (type == "C") {
      this.typeTemplate = "C";
      return this.enum.C;
    } else if (type == "CVT") {
      this.typeTemplate = "CVT";
      return this.enum.CVT;
    } else if (type == "P2PE") {
      this.typeTemplate = "P2PE";
      return this.enum.PPE;
    } else if (type == "D Merchant") {
      this.typeTemplate = "D Merchant";
      return this.enum.DMERCHANT;
    } else if (type == "D Service") {
      this.typeTemplate = "D Service";
      return this.enum.DSERVICE;
    }
  }
  /*
  checks form validators, if valid sends it to the backend to be updated on the superuser account
  */
  onSubmit() {
    this.submitted = true;
    if (!this.confirmPassword(this.subuserForm)) {
      this.notMatch = true;
      return;
    }
    if (this.subuserForm.invalid) {
      return;
    }
    this.subuserService.subuser(
      this.subuserForm.controls.password.value,
      this.subuserForm.controls.email.value,
      this.subuserForm.controls.telephone.value,
      this.subuserForm.controls.fname.value,
      this.subuserForm.controls.lname.value,
      this.subuserForm.controls.saqs.value
    ).subscribe(data => {
      this.auth.callCheckAuth().subscribe(data => {
        this.loaded = false;
        this.delay(3000).then(any => {
          this.goBack();
        });
      }
      )
    }
    );
  }
  /*
  onChange() updates the form array control for the saqFormArray with the enumerator values
  instead of the more readable names that exist on the form
  */
  onChange(saq: string, isChecked: boolean) {
    const saqFormArray = <FormArray>this.subuserForm.controls.saqs;
    if (isChecked) {
      saqFormArray.push(new FormControl(this.getEnum(saq)));
    } else {
      let index = saqFormArray.controls.findIndex(x => x.value == this.getEnum(saq))
      saqFormArray.removeAt(index);
    }
  }
  /*
  artifical delay so user gets feedback when subuser is registered
  */
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => {  });
  }
  /*
  function to better retrieve form response values
  */
  get form() { return this.subuserForm.controls };
  /*
  routes user back to account page
  */
  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  /*
  checks if password matches the password confirmation
  */
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
