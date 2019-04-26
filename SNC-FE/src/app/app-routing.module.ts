import { NgModule } from "@angular/core";
import { Routes, RouterModule, CanActivate } from "@angular/router";
import { Home } from "@components/home/home.component";
import { Account } from "@components/account/account.component";
import { Login } from "@components/login/login.component";
import { Register } from "@components/register/register.component";
import { Pci } from "@components/pci/pci.component";
import { AuthGuardService } from "@services/authguard.service";
import { Saq } from "@components/saq/saq.component";
import { Form } from "@components/form/form.component";
import { Welcome } from "@components/welcome/welcome.component";
import { Password } from "@components/password/password.component";
import { Ccw } from "@components/ccw/ccw.component";
import { Subuser } from '@components/subuser/subuser.component';
/*
This module handles the routing between components
Each route is defined with a path (the url path to a component),
  the actual components, and if used, a guard that prevents unauthorized
  users from accessing that components
*/
const routes: Routes = [
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  { path: "welcome", component: Welcome },
  { path: "login", component: Login },
  { path: "register", component: Register },
  { path: "home", component: Home, canActivate: [AuthGuardService] },
  { path: "account", component: Account, canActivate: [AuthGuardService] },
  { path: "account/password", component: Password, canActivate: [AuthGuardService] },
  { path: "account/subuser", component: Subuser, canActivate: [AuthGuardService] },
  { path: "pci", component: Pci, canActivate: [AuthGuardService] },
  { path: "pci/ccw", component: Ccw, canActivate: [AuthGuardService] },
  { path: "pci/saq/:type", component: Saq, canActivate: [AuthGuardService] },
  { path: "pci/saq/:type/form", component: Form, canActivate: [AuthGuardService] }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
