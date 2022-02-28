import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPermissionPage } from './user-permission.page';

const routes: Routes = [
  {
    path: '',
    component: UserPermissionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPermissionPageRoutingModule {}
