import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'categories',
    loadChildren: () => import('../ui/pages/category-page/category-page.module').then(m => m.CategoryPageModule),
  },
  {
    path: 'category:categoryId',
    loadChildren: () => import('../ui/pages/product-page/product-page.module').then(m => m.ProductPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('../ui/pages/login-page-template/login-page-template.module').then(m => m.LoginPageTemplatePageModule),
  },
  {
    path: 'favorites',
    loadChildren: () => import('../ui/pages/favorite-page/favorite-page.module').then(m => m.FavoritePageModule),
  },
  {
    path: 'cart',
    loadChildren: () => import('../ui/pages/cart-page/cart-page.module').then(m => m.CartPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
