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
import {Product} from "../../../../../../libs/shared-components/src/lib/interfaces/product.interface";
import {WishlistItem, WishlistService} from "../../../services/routes/whislist/whislist.service";
import {WishlistItemLocal, WishlistLocalService} from "../../../services/routes/whislist/whislist-local.service";
import {ProductService} from "../../../services/routes/product/product.service";
import {ProductLocalService} from "../../../services/routes/product/product-local.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-favorite-page',
  imports: [
    HeaderComponent,
    HeaderDescriptionComponent,
    ButtonComponent,
    ProductCardComponent,
    NgForOf
  ],
  templateUrl: './favorite-page.html',
  styleUrl: './favorite-page.css',
  standalone: true
})
export class FavoritePage {
  products: Product[] = [];
  wishlistItems: WishlistItemLocal[] = [];
  productsIds: string[] = [];

  constructor(private router: Router, private wishlistService: WishlistService, private wishlistLocalService: WishlistLocalService, private productService: ProductService, private productLocalService: ProductLocalService) {}

  async ngOnInit(){
    this.wishlistItems = this.wishlistLocalService.getItems();

    if(this.wishlistItems.length == 0){return;}

    this.wishlistItems.forEach((item) => {
      this.productsIds.push(item.product_id);
    })

    for (const id of this.productsIds) {
      const product = await this.productLocalService.getProductById(id);
      this.products.push(product);
    }

  }


  async goHomepage(){
    await this.router.navigate(['/categories']);
  }
}
