import {Component, Input} from '@angular/core';
import {NavLinks} from "../../data/navlinks";
import {Logo} from "@rip-shop/shared-components";
import {NavLinksComponent} from "../nav-links/nav-links-component";
import {SwitchThemeComponent} from "../switch-theme/switch-theme-component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'lib-header-component',
  imports: [
    Logo,
    NavLinksComponent,
    SwitchThemeComponent,
    NgIf
  ],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
  standalone: true
})
export class HeaderComponent {
  @Input() isNavLinksComponent = true;
  protected readonly NavLinks = NavLinks;
}
