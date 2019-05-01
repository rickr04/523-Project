import { Component, OnInit } from '@angular/core';
import { SAQService } from '@services/saq.service';
import { AuthenticationService } from '@services/auth.service';
import { SAQEnum } from '@models/saqEnum.enum';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-saq',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [SAQService, UserService],
})
export class Form implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private saq: SAQService,
    private formBuilder: FormBuilder,
    private user: UserService
  ) { }
  loaded: boolean = false;
  type: string;
  access: boolean = false;
  saqForm: FormGroup;
  ccwForm: FormGroup;
  enum = SAQEnum;
  questions: any[];
  keys = [];
  /*
  on initial, the component checks the SAQ type based off the url parameter matching the type and casts it with our enum
  then we get user information
  in the user info, we have them either set to issuper:true which means they are a superuser, or issuper:false means they
  are a subuser
  subusers only have access to forms assigned to them, so if they are not a superuser we check which forms they have
  access to the build the form
  */
  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');
    this.user.getSuper().subscribe(data => {
      let superuser = data.data.issuper;
      let set = new Set(data.data.saqtemplates);
      if (!superuser && !set.has(this.getEnum(this.type))) {
        this.access = false;
        this.loaded = true;
      } else {
        this.saq.getSAQ(this.getEnum(this.type)).subscribe(data => {
          this.questions = this.saq.sort(data);
            //  this.questions = data.data,
            this.buildForm()
        });
        this.access = true;
      }
    });
  }
  /*
  get enum value from SAQ type parameter
  */
  getEnum(type: String) {
    if (type == "a") {
      return this.enum.A;
    }
    else if (type == "aep") {
      return this.enum.AEP;
    } else if (type == "b") {
      return this.enum.B;
    } else if (type == "bip") {
      return this.enum.BIP;
    } else if (type == "c") {
      return this.enum.C;
    } else if (type == "cvt") {
      return this.enum.CVT;
    } else if (type == "p2pe") {
      return this.enum.PPE;
    } else if (type == "d_merchant") {
      return this.enum.DMERCHANT;
    } else if (type == "d_service") {
      return this.enum.DSERVICE;
    }
  }
  /*
  dynamically generates one of the 9 different forms in real time based off the backend response with the answeredquestions
  */
  buildForm() {
    let group = {};
    for (let i = 0; i < this.questions.length; i++) {
      group[`${this.questions[i].question._id}`] = this.questions[i].answer;
      if (this.questions[i].answer == "Yes with CCW") {
        this.keys.push(this.questions[i].question._id);
      }
    }
    this.saqForm = this.formBuilder.group(group);
    this.loaded = true;
  }
  submitting: boolean = false;
  /*
  When the form is submitted it send the information to the backend to update the users database
  and generate the pdf for them to download at any point from amazon S3
  */
  onSubmit() {
    this.submitting = true;
    this.saq.submitSAQ(this.getEnum(this.type), this.saqForm.value).subscribe(data => { this.submitting = false, this.router.navigate(['../'], { relativeTo: this.route }); });
  }
  /*
  When the form is submitted it send the information to the backend to update the users database
  */
  onSave() {
    this.submitting = true;
    this.saq.saveSAQ(this.getEnum(this.type), this.saqForm.value).subscribe(data => { this.submitting = false, this.router.navigate(['../'], { relativeTo: this.route }); });
  }
}
