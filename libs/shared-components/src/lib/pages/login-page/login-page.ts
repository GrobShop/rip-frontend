import { Component } from '@angular/core';
import {ButtonComponent} from "../../components/button/button-component";
import {HeaderComponent} from "../../components/header/header-component";
import {HeaderDescriptionComponent} from "../../components/header-description/header-description-component";
import {InputComponent} from "../../components/input/input-component";

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
export class LoginPage {}
