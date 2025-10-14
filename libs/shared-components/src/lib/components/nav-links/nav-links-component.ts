import {Component, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {NavLink} from "../../interfaces/navlinks.interface";

@Component({
  selector: 'lib-nav-links-component',
  imports: [
    RouterLink,
    NgForOf,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './nav-links-component.html',
  styleUrl: './nav-links-component.css',
  standalone: true
})
export class NavLinksComponent {
  @Input() links: NavLink[] = [];
}
