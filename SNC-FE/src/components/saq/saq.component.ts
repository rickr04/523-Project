import { Component, OnInit } from '@angular/core';
import { SAQService } from '@services/saq.service';
import { AuthenticationService } from '@services/auth.service';
import { SAQEnum } from '@models/saqEnum.enum';




@Component({
  selector: 'app-saq',
  templateUrl: './saq.component.html',
  styleUrls: ['./saq.component.css'],
  providers: [SAQService],
})
export class Saq implements OnInit {

  constructor(
    private saq: SAQService
  ) { }
    enum = SAQEnum;

  ngOnInit() {
    console.log(this.enum.A);
    this.saq.getSAQ(this.enum.A).subscribe(data=>{console.log(data)});

  }

}
