import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CategoryPageRoutingModule} from "./category-page-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CategoryPageRoutingModule
  ],
})
export class CategoryPageModule {}
