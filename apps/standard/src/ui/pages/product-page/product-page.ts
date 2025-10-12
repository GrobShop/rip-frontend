import { Component } from '@angular/core';
import {
  ProductCardComponent
} from "../../../../../../libs/shared-components/src/lib/components/cards/product/product-card/product-card-component";
import {
  HeaderDescriptionComponent
} from "../../../../../../libs/shared-components/src/lib/components/header-description/header-description-component";
import {HeaderComponent} from "../../../../../../libs/shared-components/src/lib/components/header/header-component";
import {ButtonComponent} from "../../../../../../libs/shared-components/src/lib/components/button/button-component";
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-page',
  imports: [
    ProductCardComponent,
    HeaderDescriptionComponent,
    HeaderComponent,
    ButtonComponent
  ],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
  standalone: true
})
export class ProductPage {
  categoryId: any;

  // constructor(private route: ActivatedRoute, private router: Router,) {
  // }
  //
  // ngOnInit(){
  //   this.categoryId = +this.route.snapshot.paramMap.get('categoryId')!;
  // }

  constructor(private router: Router) {}


  async goHomepage(){
    await this.router.navigate(['/categories']);
  }
}
