import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { TestService } from '@services/test.service';
@Component({
  selector: 'home-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [TestService],
})
export class Home implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  /*
  Nothing here, purely markup
  */
  ngOnInit() { }
}
