import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonComponent} from "../../components/button/button-component";
import {HeaderComponent} from "../../components/header/header-component";
import {HeaderDescriptionComponent} from "../../components/header-description/header-description-component";
import {InputComponent} from "../../components/input/input-component";
import {ValidateService} from "../../services/validate.service";
import {LoginService} from "../../../../../../apps/admin/src/services/routes/auth/login.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'lib-login-page',
  imports: [
    ButtonComponent,
    HeaderComponent,
    HeaderDescriptionComponent,
    InputComponent
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
  standalone: true
})
export class LoginPage {
  email: string = '';
  password: string = '';
  @Input() logoAnnotation: string = '';
  @Output() emailChange = new EventEmitter<string>();
  @Output() passwordChange = new EventEmitter<string>();
  @Output() clickEnterEvent = new EventEmitter<void>();

  onEmailChange(value:string){
    this.email = value;
    this.emailChange.emit(this.email);
  }

  onPasswordChange(value:string){
    this.password = value;
    this.passwordChange.emit(this.password);
  }

  onLogin(){
    this.clickEnterEvent.emit();
  }
}
