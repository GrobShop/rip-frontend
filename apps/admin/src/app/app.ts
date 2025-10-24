import {ApplicationRef, Component, EnvironmentInjector} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import { NxWelcome } from './nx-welcome';
import {NavBarComponent} from "../../../../libs/shared-components/src/lib/components/nav-bar/nav-bar-component";
import {AdminNavLinks} from "../../../../libs/shared-components/src/lib/data/navlinks";
import {ToastService} from "../../../../libs/shared-components/src/lib/services/notification/toast.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  imports: [RouterModule, NavBarComponent, RouterOutlet, HttpClientModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App {
  protected title = 'admin';
  protected readonly AdminNavLinks = AdminNavLinks;

  constructor(appRef: ApplicationRef, injector: EnvironmentInjector) {
    ToastService.initialize(appRef, injector);
  }
}
