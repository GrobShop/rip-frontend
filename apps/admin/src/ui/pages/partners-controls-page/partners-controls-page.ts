import { Component } from '@angular/core';
import {HeaderComponent} from "../../../../../../libs/shared-components/src/lib/components/header/header-component";
import {
  HeaderDescriptionComponent
} from "../../../../../../libs/shared-components/src/lib/components/header-description/header-description-component";

@Component({
  selector: 'app-partners-controls-page',
  imports: [
    HeaderComponent,
    HeaderDescriptionComponent
  ],
  templateUrl: './partners-controls-page.html',
  styleUrl: './partners-controls-page.css',
  standalone: true
})
export class PartnersControlsPage {}
