import { Component, OnInit } from '@angular/core';
import { SAQService } from '@services/saq.service';
import { AuthenticationService } from '@services/auth.service';
import { SAQEnum } from '@models/saqEnum.enum';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';





@Component({
  selector: 'app-saq',
  templateUrl: './saq.component.html',
  styleUrls: ['./saq.component.css'],
  providers: [SAQService],
})
export class Saq implements OnInit {

  constructor(
    private saq: SAQService,
    private formBuilder: FormBuilder,
  ) { }
  loaded: boolean;
  saqForm: FormGroup;
  enum = SAQEnum;
  questions: any[];
  ngOnInit() {
    this.loaded = false;
    console.log(this.enum.A);
    this.saq.getSAQ(this.enum.A).subscribe(data => {
    this.questions = data.data,
      this.buildForm()
    });
  }

  buildForm() {
    let group = {};
    for (let i = 0; i < this.questions.length; i++) {
      group[`${this.questions[i]._id}`] = '';
    }
    this.saqForm = this.formBuilder.group(group);
    console.log(this.saqForm);
    this.loaded = true;
  }

  onSubmit() {

  }

}
