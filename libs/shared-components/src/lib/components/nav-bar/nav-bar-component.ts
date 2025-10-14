import {Component, Input} from '@angular/core';
import {NavLink} from "../../interfaces/navlinks.interface";
import {NavLinksComponent} from "../nav-links/nav-links-component";

@Component({
  selector: 'lib-nav-bar-component',
  imports: [
    NavLinksComponent
  ],
  templateUrl: './nav-bar-component.html',
  styleUrl: './nav-bar-component.css',
  standalone: true
})
export class NavBarComponent {
  @Input() links: NavLink[] = [];
}
