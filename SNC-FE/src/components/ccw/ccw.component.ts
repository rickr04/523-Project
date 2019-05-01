import { Component, OnInit } from '@angular/core';
import { SAQService } from '@services/saq.service';
import { AuthenticationService } from '@services/auth.service';
import { SAQEnum } from '@models/saqEnum.enum';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-ccw',
  templateUrl: './ccw.component.html',
  styleUrls: ['./ccw.component.css'],
  providers: [SAQService],
})
export class Ccw implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private saq: SAQService,
    private formBuilder: FormBuilder,
  ) { }
  loaded: boolean;
  type: string;
  view = false;
  saqForm: FormGroup;
  ccwForm: FormGroup;
  enum = SAQEnum;
  questions: any[];
  keys = [];
  ccwURL = this.saq.ccwURL();
  headers = ["Constraints", "Objective", "Identified Risk", "Compensating Controls", "Testing of Controls", "Maintenance of Controls"];
  /*
  On initial load of the component our server is called requesting all of the users answered questions where the
  answer was "Yes with CCW"
  Calls our SAQService to sort the questions based off their _id
  Calls buildCCWForm()
  */
  ngOnInit() {
    this.loaded = false;
    this.saq.getCCW().subscribe(data => {
      this.questions = this.saq.sort(data);
      this.buildCCWForm();
    });
  }
  /*
  getEnum() returns the associated pdf name value so that we can hand it to the backend to deal with pdf loading
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
  buildCCWForm() builds the form that presents on the component page,
  because the six headers never change, they are somewhat hard-codeed on the frontend side
  The if-else determines if it is the users first time contributing CCW information,
  if it is it sets the text areas to an empty string, if they have done it before it sets
  the textarea to the existing submission for that question and field
  */
  buildCCWForm() {
    let group = {};
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i].answer == "Yes with CCW") {
        if (this.questions[i].ccw[0] == null) {
          group[`${this.questions[i].question._id}_${this.headers[0]}`] = "";
          group[`${this.questions[i].question._id}_${this.headers[1]}`] = "";
          group[`${this.questions[i].question._id}_${this.headers[2]}`] = "";
          group[`${this.questions[i].question._id}_${this.headers[3]}`] = "";
          group[`${this.questions[i].question._id}_${this.headers[4]}`] = "";
          group[`${this.questions[i].question._id}_${this.headers[5]}`] = "";
        } else {
          group[`${this.questions[i].question._id}_${this.headers[0]}`] = this.questions[i].ccw[0].response || "";
          group[`${this.questions[i].question._id}_${this.headers[1]}`] = this.questions[i].ccw[1].response || "";
          group[`${this.questions[i].question._id}_${this.headers[2]}`] = this.questions[i].ccw[2].response || "";
          group[`${this.questions[i].question._id}_${this.headers[3]}`] = this.questions[i].ccw[3].response || "";
          group[`${this.questions[i].question._id}_${this.headers[4]}`] = this.questions[i].ccw[4].response || "";
          group[`${this.questions[i].question._id}_${this.headers[5]}`] = this.questions[i].ccw[5].response || "";
        }
      }
    }
    this.ccwForm = this.formBuilder.group(group);
    this.loaded = true;
  }
  /*
  when submiting the form, the information needs to be reshaped drastically
  when the form is submitted it comes in as a single, flat json Object
  after iterating throught the form control values, I push the header and header response into an object,
  each of those for one question into an array, and all of them into an array to later iterate through to submit
  to be updated
  */
  onSubmit() {
    let currentQuestion = ""
    let array = [];
    let group = {};
    Object.keys(this.ccwForm.controls).forEach(key => {
      if (key.split("_")[0] == currentQuestion) {
        group[`${key.split("_")[1]}`] = this.ccwForm.controls[key].value || "";
      }
      else {
        if (currentQuestion !== "") {
          array.push(group);
        }
        currentQuestion = key.split("_")[0];
        group = {};
        group[`Requirement`] = key.split("_")[0];
        group[`Constraints`] = this.ccwForm.controls[key].value || "";
      }
    });
    array.push(group);
    let temparray = [];
    for (let i = 0; i < array.length; i++) {
      Object.keys(array[i]).forEach(key => {
        temparray.push({ header: key, response: array[i][key] })
      });
      this.saq.submitCCW(temparray, temparray[0].response).subscribe(data => { this.view = true; this.router.navigate(['../'], { relativeTo: this.route }) });
      temparray = [];
    };
  }
}
