import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Home } from '@components/home/home.component';
import { Account } from '@components/account/account.component';
import { Login } from '@components/login/login.component';
import { Register } from '@components/register/register.component';
import { Pci } from '@components/pci/pci.component';





const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch: 'full'},
  {path: 'home', component: Home},
    {path: 'login', component: Login},
      {path: 'register', component: Register},
        {path: 'account', component: Account},
          {path: 'pci', component: Pci},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
