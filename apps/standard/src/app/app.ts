import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import {Logo} from "@rip-shop/shared-components";
import {
  SwitchThemeComponent
} from "../../../../libs/shared-components/src/lib/components/switch-theme/switch-theme-component";

@Component({
  imports: [NxWelcome, RouterModule, Logo, SwitchThemeComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App {
  protected title = 'standard';
}
