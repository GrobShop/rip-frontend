import { Component } from '@angular/core';
import {HeaderComponent} from "../../../../../../libs/shared-components/src/lib/components/header/header-component";
import {
  HeaderDescriptionComponent
} from "../../../../../../libs/shared-components/src/lib/components/header-description/header-description-component";
import {ButtonComponent} from "../../../../../../libs/shared-components/src/lib/components/button/button-component";
import {
  ProductCardComponent
} from "../../../../../../libs/shared-components/src/lib/components/cards/product/product-card/product-card-component";
import {NgForOf, NgIf} from "@angular/common";
import {InputComponent} from "../../../../../../libs/shared-components/src/lib/components/input/input-component";
import { Router, RouterModule } from '@angular/router';
import {Product} from "../../../../../../libs/shared-components/src/lib/interfaces/product.interface";
import {WishlistItemLocal} from "../../../services/routes/whislist/whislist-local.service";
import {CartItem, CartService} from "../../../services/routes/cart/cart.service";
import {CartItemLocal, CartLocalService} from "../../../services/routes/cart/cart-local.service";
import {ProductService} from "../../../services/routes/product/product.service";
import {ProductLocalService} from "../../../services/routes/product/product-local.service";

@Component({
  selector: 'app-cart-page',
  imports: [
    HeaderComponent,
    HeaderDescriptionComponent,
    ButtonComponent,
    ProductCardComponent,
    NgIf,
    InputComponent,
    NgForOf
  ],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
  standalone: true
})
export class CartPage {
  totalAmount: number = 0;
  totalCount: number = 0;
  isOrder: boolean = false;

  products: Product[] = [];
  cartItems: CartItemLocal[] = [];
  productsIds: string[] = [];

  shipMethod: string = '';
  paymentMethod: string = '';

  constructor(private router: Router, private cartService: CartService, private cartLocalService: CartLocalService, private productService: ProductService, private productLocalService: ProductLocalService) {}

  async ngOnInit(){
    await this.cartLocalService.syncCart();
    this.cartItems = this.cartLocalService.getItems();

    if(this.cartItems.length == 0){return;}

    this.cartItems.forEach((item) => {
      this.productsIds.push(item.product_id);
    })

    for (const id of this.productsIds) {
      const product = await this.productLocalService.getProductById(id);
      this.totalAmount += Number(product.price);
      this.products.push(product);
    }
    this.totalCount = this.cartLocalService.getTotalItems();
  }

  onOrder(){
    this.isOrder = true;
  }

  onCancelOrder(){
    this.isOrder = false;
  }

  async goHomepage(){
    await this.router.navigate(['/categories']);
  }

  onChangeShipMethod($event: string) {
    this.shipMethod = $event;
  }

  onChangePaymentMethod($event: string) {
    this.paymentMethod = $event;
  }

  onSubmitCartRequest() {

  }

  onQuantityChange(quantityObj: {quantity: number, product_id: string, product: Product}) {
    this.cartItems.map((item) => {
      if(item.product_id === quantityObj.product_id){
        item.quantity = quantityObj.quantity;
      }
    });

    let allCount = 0;
    let allAmount = 0;
    this.totalAmount = 0;
    this.cartItems.forEach((item) => {
      allCount += Number(item.quantity);
      this.products.forEach((itemProduct) => {
        if(item.product_id === itemProduct.id){
          let amountProduct = item.quantity * itemProduct.price;
          allAmount += Number(amountProduct);
        }
      })
    });

    this.totalAmount = Number(allAmount.toFixed(2));
    this.totalCount = allCount;
  }
}
