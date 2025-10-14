import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },
  {
    path: 'categories-controls',
    loadChildren: () => import('../ui/pages/categories-controls-page/categories-controls-page.module').then(m => m.CategoriesControlsPageModule),
  },
  {
    path: 'partners-controls',
    loadChildren: () => import('../ui/pages/partners-controls-page/partners-controls-page.module').then(m => m.PartnersControlsPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('../ui/pages/login-page-template/login-page-template.module').then(m => m.LoginPageTemplatePageModule),
  },
  {
    path: 'products-controls',
    loadChildren: () => import('../ui/pages/products-controls-page/products-controls-page.module').then(m => m.ProductsControlsPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
