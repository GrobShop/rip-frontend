import { Component } from '@angular/core';
import {
  ProductCardComponent
} from "../../../../../../libs/shared-components/src/lib/components/cards/product/product-card/product-card-component";
import {
  HeaderDescriptionComponent
} from "../../../../../../libs/shared-components/src/lib/components/header-description/header-description-component";
import {HeaderComponent} from "../../../../../../libs/shared-components/src/lib/components/header/header-component";

@Component({
  selector: 'app-product-page',
  imports: [
    ProductCardComponent,
    HeaderDescriptionComponent,
    HeaderComponent
  ],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
  standalone: true
})
export class ProductPage {}
