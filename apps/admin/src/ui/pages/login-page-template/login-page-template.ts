import { Component } from '@angular/core';
import {LoginPage} from "../../../../../../libs/shared-components/src/lib/pages/login-page/login-page";

@Component({
  selector: 'app-login-page-template',
  imports: [
    LoginPage
  ],
  templateUrl: './login-page-template.html',
  styleUrl: './login-page-template.css',
  standalone: true
})
export class LoginPageTemplate {}
