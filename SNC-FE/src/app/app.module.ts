import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '@app/app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { Home } from '@components/home/home.component';
import { Account } from '@components/account/account.component';
import { Login } from '@components/login/login.component';
import { Register } from '@components/register/register.component';
import { Pci } from '@components/pci/pci.component';
import { Demo } from '@components/demo/demo.component';
import { RouterModule } from '@angular/router';
import { Saq } from '@components/saq/saq.component';
import { Form } from '@components/form/form.component';
import { Password } from '@components/password/password.component';
import { Ccw } from '@components/ccw/ccw.component';
import { Subuser } from '@components/subuser/subuser.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Welcome } from "@components/welcome/welcome.component";








@NgModule({
  declarations: [
    AppComponent,
    Home,
    Login,
    Register,
    Pci,
    Account,
    Password,
    Demo,
    Saq,
    Form,
    Welcome,
    Ccw,
    Subuser
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule


  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
