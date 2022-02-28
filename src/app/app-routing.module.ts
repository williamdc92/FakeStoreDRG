import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 { 
   path: '', 
   redirectTo : 'tutorial',
   pathMatch : 'full'
 },

  { 
    path: 'products',
    loadChildren: () => import('./pages/shop/pagesOfShop/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/shop/pagesOfShop/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/shop/pagesOfShop/favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  {
    path: 'order-history',
    loadChildren: () => import('./pages/shop/pagesOfShop/order-history/order-history.module').then( m => m.OrderHistoryPageModule)
  },
  {
    path: 'products/producer/:producer',
    loadChildren: () => import('./pages/shop/pagesOfShop/filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'products/category/:category',
    loadChildren: () => import('./pages/shop/pagesOfShop/filtercategory/filtercategory.module').then( m => m.FiltercategoryPageModule)
  },
  {
    path: 'products/:id',
    loadChildren: () => import('./pages/shop/pagesOfShop/product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/OtherPages/tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/OtherPages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'admin/48d148c0-d41a-4f07-8134-178bea682c7b',
    loadChildren: () => import('./pages/adminPages/edit-database/edit-database.module').then( m => m.EditDatabasePageModule)
  },
  {
    path: 'admin/42b06665-c6a1-4e81-bcdf-133ddf58c370',
    loadChildren: () => import('./pages/adminPages/user-permission/user-permission.module').then( m => m.UserPermissionPageModule)
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
