import { Component } from '@angular/core';
import {HeaderComponent} from "../../../../../../libs/shared-components/src/lib/components/header/header-component";
import {
  HeaderDescriptionComponent
} from "../../../../../../libs/shared-components/src/lib/components/header-description/header-description-component";
import {NavBarComponent} from "../../../../../../libs/shared-components/src/lib/components/nav-bar/nav-bar-component";
import {AdminNavLinks} from "../../../../../../libs/shared-components/src/lib/data/navlinks";

@Component({
  selector: 'app-products-controls-page',
    imports: [
        HeaderComponent,
        HeaderDescriptionComponent,
        NavBarComponent
    ],
  templateUrl: './products-controls-page.html',
  styleUrl: './products-controls-page.css',
  standalone: true
})
export class ProductsControlsPage {
  protected readonly AdminNavLinks = AdminNavLinks;
}
