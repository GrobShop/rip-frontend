import { Component } from '@angular/core';
import {HeaderComponent} from "../../../../../../libs/shared-components/src/lib/components/header/header-component";
import {
  HeaderDescriptionComponent
} from "../../../../../../libs/shared-components/src/lib/components/header-description/header-description-component";
import {ButtonComponent} from "../../../../../../libs/shared-components/src/lib/components/button/button-component";
import {
  ProductCardComponent
} from "../../../../../../libs/shared-components/src/lib/components/cards/product/product-card/product-card-component";
import {NgIf} from "@angular/common";
import {InputComponent} from "../../../../../../libs/shared-components/src/lib/components/input/input-component";

@Component({
  selector: 'app-cart-page',
  imports: [
    HeaderComponent,
    HeaderDescriptionComponent,
    ButtonComponent,
    ProductCardComponent,
    NgIf,
    InputComponent
  ],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
  standalone: true
})
export class CartPage {
  totalAmount: number = 5500;
  totalCount: number = 5;
  isOrder: boolean = false;

  onOrder(){
    this.isOrder = true;
  }

  onCancelOrder(){
    this.isOrder = false;
  }
}
