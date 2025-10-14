import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoriesControlsPage} from "./categories-controls-page";

const routes: Routes = [
  {
    path: '',
    component: CategoriesControlsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesControlsPageRoutingModule {}
