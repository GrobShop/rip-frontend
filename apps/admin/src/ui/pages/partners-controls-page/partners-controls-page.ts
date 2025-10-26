import { Component } from '@angular/core';
import {HeaderComponent} from "../../../../../../libs/shared-components/src/lib/components/header/header-component";
import {
  HeaderDescriptionComponent
} from "../../../../../../libs/shared-components/src/lib/components/header-description/header-description-component";
import {NavBarComponent} from "../../../../../../libs/shared-components/src/lib/components/nav-bar/nav-bar-component";
import {AdminNavLinks} from "../../../../../../libs/shared-components/src/lib/data/navlinks";
import {
  PartnerCardComponent
} from "../../../../../../libs/shared-components/src/lib/components/cards/partner/partner-card/partner-card-component";

@Component({
  selector: 'app-partners-controls-page',
  imports: [
    HeaderComponent,
    HeaderDescriptionComponent,
    NavBarComponent,
    PartnerCardComponent
  ],
  templateUrl: './partners-controls-page.html',
  styleUrl: './partners-controls-page.css',
  standalone: true
})
export class PartnersControlsPage {
  protected readonly AdminNavLinks = AdminNavLinks;
}
