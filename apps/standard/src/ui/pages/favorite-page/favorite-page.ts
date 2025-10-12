import { Component } from '@angular/core';
import {HeaderComponent} from "../../../../../../libs/shared-components/src/lib/components/header/header-component";
import {
  HeaderDescriptionComponent
} from "../../../../../../libs/shared-components/src/lib/components/header-description/header-description-component";
import {ButtonComponent} from "../../../../../../libs/shared-components/src/lib/components/button/button-component";
import {
  ProductCardComponent
} from "../../../../../../libs/shared-components/src/lib/components/cards/product/product-card/product-card-component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-favorite-page',
  imports: [
    HeaderComponent,
    HeaderDescriptionComponent,
    ButtonComponent,
    ProductCardComponent
  ],
  templateUrl: './favorite-page.html',
  styleUrl: './favorite-page.css',
  standalone: true
})
export class FavoritePage {

  constructor(private router: Router) {}


  async goHomepage(){
    await this.router.navigate(['/categories']);
  }
}
