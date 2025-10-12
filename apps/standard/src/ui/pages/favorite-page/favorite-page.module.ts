import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {FavoritePageRoutingModule} from "./favorite-page-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FavoritePageRoutingModule
  ],
})
export class FavoritePageModule {}
