import { Component } from '@angular/core';
import {LoginPage} from "../../../../../../libs/shared-components/src/lib/pages/login-page/login-page";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ValidateService} from "../../../../../../libs/shared-components/src/lib/services/validate.service";
import {LoginService} from "../../../services/routes/auth/login.service";

@Component({
  selector: 'app-login-page-template',
  imports: [
    LoginPage
  ],
  templateUrl: './login-page-template.html',
  styleUrl: './login-page-template.css',
  standalone: true
})
export class LoginPageTemplate {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) {
  }

  // @ts-ignore
  async onLogin(){
    if(ValidateService.validateEmail(this.email) && ValidateService.validatePassword(this.password).isValid){
      await this.loginService.login(this.email, this.password);
    }
  }

  onEmailChange(value:string) {
    this.email = value;
  }

  onPasswordChange(value:string) {
    this.password = value;
  }
}
