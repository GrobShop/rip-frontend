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
    path: 'categories',
    loadChildren: () => import('../ui/pages/category-page/category-page.module').then(m => m.CategoryPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'category/:categoryId',
    loadChildren: () => import('../ui/pages/product-page/product-page.module').then(m => m.ProductPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('../ui/pages/login-page-template/login-page-template.module').then(m => m.LoginPageTemplatePageModule),
    canActivate: [AuthGuardInverse]
  },
  {
    path: 'favorites',
    loadChildren: () => import('../ui/pages/favorite-page/favorite-page.module').then(m => m.FavoritePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    loadChildren: () => import('../ui/pages/cart-page/cart-page.module').then(m => m.CartPageModule),
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
