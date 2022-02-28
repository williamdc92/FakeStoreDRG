import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDatabasePageRoutingModule } from './edit-database-routing.module';

import { EditDatabasePage } from './edit-database.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditDatabasePageRoutingModule
  ],
  declarations: [EditDatabasePage]
})
export class EditDatabasePageModule {}
