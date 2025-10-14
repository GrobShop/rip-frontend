import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ProductsControlsPageRoutingModule} from "./products-controls-page-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductsControlsPageRoutingModule
  ],
})
export class ProductsControlsPageModule {}
