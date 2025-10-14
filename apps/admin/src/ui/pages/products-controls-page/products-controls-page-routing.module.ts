import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsControlsPage} from "./products-controls-page";

const routes: Routes = [
  {
    path: '',
    component: ProductsControlsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsControlsPageRoutingModule {}
