import { Component } from '@angular/core';
import {HeaderComponent} from "../../../../../../libs/shared-components/src/lib/components/header/header-component";
import {
  HeaderDescriptionComponent
} from "../../../../../../libs/shared-components/src/lib/components/header-description/header-description-component";

@Component({
  selector: 'app-products-controls-page',
  imports: [
    HeaderComponent,
    HeaderDescriptionComponent
  ],
  templateUrl: './products-controls-page.html',
  styleUrl: './products-controls-page.css',
  standalone: true
})
export class ProductsControlsPage {}
