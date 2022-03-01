import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { IonicModule } from '@ionic/angular';

import { FiltercategoryPageRoutingModule } from './filtercategory-routing.module';

import { FiltercategoryPage } from './filtercategory.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltercategoryPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [FiltercategoryPage]
})
export class FiltercategoryPageModule {}
