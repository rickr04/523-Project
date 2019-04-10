import { Component, OnInit } from '@angular/core';
import { SAQService } from '@services/saq.service';
import { AuthenticationService } from '@services/auth.service';
import { SAQEnum } from '@models/saqEnum.enum';
import * as FileSaver from 'file-saver';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';







@Component({
  selector: 'app-saq',
  templateUrl: './saq.component.html',
  styleUrls: ['./saq.component.css'],
  providers: [SAQService],
})
export class Saq implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private saq: SAQService,

  ) { }
  loaded: boolean;
  view: boolean;
  type:string;
  saqForm: FormGroup;
  enum = SAQEnum;
  questions: any[];
  keys:any[];
  typeTemplate: String;


  ngOnInit() {
    this.view=false;
    this.type = this.route.snapshot.paramMap.get('type');

    this.loaded = false;

    this.getEnum(this.type);
  }

 getEnum(type: String){
   if(type == "a"){
      this.typeTemplate = "A";
     return this.enum.A;
   }
   else if(type == "aep"){
       this.typeTemplate = "AEP";
     return this.enum.AEP;
   }else if(type == "b"){
       this.typeTemplate = "B";
     return this.enum.B;
   }else if(type == "bip"){
       this.typeTemplate = "BIP";
     return this.enum.BIP;
   }else if(type == "c"){
       this.typeTemplate = "C";
     return this.enum.C;
   }else if(type == "cvt"){
       this.typeTemplate = "CVT";
     return this.enum.CVT;
   }else if(type == "p2pe"){
       this.typeTemplate = "P2PE";
     return this.enum.PPE;
   }else if(type == "d_merchant"){
       this.typeTemplate = "D Merchant";
     return this.enum.DMERCHANT;
   }else if(type == "d_service"){
       this.typeTemplate = "D Service";
     return this.enum.DSERVICE;
   }
 }
 flip(){
   this.saq.getKeys(this.getEnum(this.type)).subscribe(data=>{this.keys = data.data, this.view = true});

 }
servePDF(index: any){
  var key = this.keys[index];
  var fileName = key.split('/');
  this.saq.getForm(key).subscribe(data=>{
    var newBlob = new Blob([data], { type: "application/pdf" });

      FileSaver.saveAs(newBlob, fileName[1]);

});
}

 getTime(num: any){
  var date = new Date(Number(this.keys[num].split('/')[2].split('.')[0]));
    var dateString = ""+date
    return dateString.split('G')[0]};

}
