import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ManageCommentComponent } from './comment/comment.component';
import { ManageItemComponent } from './item/item.component';
import { ManageTableComponent } from './table/table.component';
import { ManageComponent } from './manage.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { ManageAddCommentComponent } from './add/add-comment/add-comment.component';
import { ManageAddItemComponent } from './add/add-item/add-item.component';
import { ManageAddTableComponent } from './add/add-table/add-table.component';
import { ImportExcelComponent } from './add/import-excel/import-excel.component';
import { ManageUserComponent } from './user/user.component';
import { ManageAddUserComponent } from './add/add-user/add-user.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: ManageComponent,
  },
];

@NgModule({
  declarations: [
    ManageCommentComponent,
    ManageAddCommentComponent,
    ManageItemComponent,
    ManageAddItemComponent,
    ManageTableComponent,
    ManageAddTableComponent,
    ManageUserComponent,
    ManageAddUserComponent,
    ManageComponent,
    ImportExcelComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
  entryComponents: [
    ManageAddCommentComponent,
    ManageAddItemComponent,
    ManageAddTableComponent,
  ],
})
export class ManageModule {}
