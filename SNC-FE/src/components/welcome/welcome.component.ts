import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { TestService } from '@services/test.service';
@Component({
  selector: 'welcome-root',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [TestService],
})
export class Welcome implements OnInit {
  constructor(
  ) { }
  /*
  Nothing here, purely markup
  */
  ngOnInit() {
  }
}
