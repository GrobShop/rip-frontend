import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CategoriesControlsPageRoutingModule} from "./categories-controls-page-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CategoriesControlsPageRoutingModule
  ],
})
export class CategoriesControlsPageModule {}
