import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  // {
  //   path: 'categories-controls',
  //   loadChildren: () => import('../ui/pages/category-page/category-page.module').then(m => m.CategoryPageModule),
  // },
  // {
  //   path: 'partners-controls',
  //   loadChildren: () => import('../ui/pages/product-page/product-page.module').then(m => m.ProductPageModule),
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('../ui/pages/login-page-template/login-page-template.module').then(m => m.LoginPageTemplatePageModule),
  // },
  // {
  //   path: 'products-controls',
  //   loadChildren: () => import('../ui/pages/favorite-page/favorite-page.module').then(m => m.FavoritePageModule),
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
