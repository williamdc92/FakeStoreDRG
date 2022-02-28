import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPermissionPageRoutingModule } from './user-permission-routing.module';

import { UserPermissionPage } from './user-permission.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPermissionPageRoutingModule
  ],
  declarations: [UserPermissionPage]
})
export class UserPermissionPageModule {}
