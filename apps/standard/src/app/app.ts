import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import {Logo} from "@rip-shop/shared-components";
import {
  SwitchThemeComponent
} from "../../../../libs/shared-components/src/lib/components/switch-theme/switch-theme-component";
import {
  HeaderDescriptionComponent
} from "../../../../libs/shared-components/src/lib/components/header-description/header-description-component";
import {NavLinksComponent} from "../../../../libs/shared-components/src/lib/components/nav-links/nav-links-component";
import {HeaderComponent} from "../../../../libs/shared-components/src/lib/components/header/header-component";
import {InputComponent} from "../../../../libs/shared-components/src/lib/components/input/input-component";

@Component({
  imports: [NxWelcome, RouterModule, Logo, SwitchThemeComponent, HeaderDescriptionComponent, NavLinksComponent, HeaderComponent, InputComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App {
  protected title = 'standard';
}
