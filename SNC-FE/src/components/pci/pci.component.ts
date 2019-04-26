import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { TestService } from '@services/test.service';
import { SAQEnum } from '@models/saqEnum.enum';
@Component({
  selector: 'pci-root',
  templateUrl: './pci.component.html',
  styleUrls: ['./pci.component.css'],
  providers: [TestService],
})
export class Pci implements OnInit {
  constructor(
  ) { }
  ngOnInit() {
  }
}
