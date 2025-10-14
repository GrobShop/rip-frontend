import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import { NxWelcome } from './nx-welcome';
import {NavBarComponent} from "../../../../libs/shared-components/src/lib/components/nav-bar/nav-bar-component";
import {AdminNavLinks} from "../../../../libs/shared-components/src/lib/data/navlinks";

@Component({
  imports: [RouterModule, NavBarComponent, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App {
  protected title = 'admin';
  protected readonly AdminNavLinks = AdminNavLinks;
}
