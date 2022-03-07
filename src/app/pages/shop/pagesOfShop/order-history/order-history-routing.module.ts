import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderHistoryPage } from './order-history.page';

const routes: Routes = [
  {
    path: '',
    component: OrderHistoryPage
  },
  {
    path: ':id',
    loadChildren: () => import('./order-details/order-details.module').then( m => m.OrderDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderHistoryPageRoutingModule {}
