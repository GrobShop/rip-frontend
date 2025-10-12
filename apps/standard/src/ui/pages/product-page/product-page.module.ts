import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ProductPageRoutingModule} from "./product-page-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductPageRoutingModule
  ],
})
export class ProductPageModule {}
