import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageTemplate} from "./login-page-template";

const routes: Routes = [
  {
    path: '',
    component: LoginPageTemplate
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageTemplateRoutingModule {}
