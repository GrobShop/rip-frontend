import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PartnersControlsPage} from "./partners-controls-page";

const routes: Routes = [
  {
    path: '',
    component: PartnersControlsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartnersControlsPageRoutingModule {}
