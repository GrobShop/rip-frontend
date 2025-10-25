import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./auth.guard";
import {AuthGuardInverse} from "./auth-inverse.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'categories-controls',
    loadChildren: () => import('../ui/pages/categories-controls-page/categories-controls-page.module').then(m => m.CategoriesControlsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'partners-controls',
    loadChildren: () => import('../ui/pages/partners-controls-page/partners-controls-page.module').then(m => m.PartnersControlsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('../ui/pages/login-page-template/login-page-template.module').then(m => m.LoginPageTemplatePageModule),
    canActivate: [AuthGuardInverse]
  },
  {
    path: 'products-controls',
    loadChildren: () => import('../ui/pages/products-controls-page/products-controls-page.module').then(m => m.ProductsControlsPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
