import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {LoginPageTemplateRoutingModule} from "./login-page-template-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginPageTemplateRoutingModule
  ],
})
export class LoginPageTemplatePageModule {}
