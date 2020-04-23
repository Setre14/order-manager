import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FloorplanComponent } from './floorplan.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GridsterModule } from 'angular-gridster2';

const routes: Routes = [
  {
    path: '',
    component: FloorplanComponent,
  },
];

@NgModule({
  declarations: [FloorplanComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GridsterModule,
    ReactiveFormsModule,
  ],
})
export class FloorplanModule {}
