import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { TablesComponent } from './tables.component';
import { OverviewComponent } from './overview/overview.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { DetailComponent } from './detail/detail.component';
import { OrderComponent } from './order/order.component';
import { PayComponent } from './pay/pay.component';
import { GridComponent } from './grid/grid.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { CommentComponent } from './comment/comment.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { SearchComponent } from './search/search.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

const routes: Routes = [
  { path: '', redirectTo: 'overview' },
  {
    path: '',
    component: TablesComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: 'detail/:table',
        component: DetailComponent,
      },
      {
        path: 'order/:table',
        component: OrderComponent,
      },
      {
        path: 'pay/:table',
        component: PayComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    TablesComponent,
    OverviewComponent,
    DetailComponent,
    OrderComponent,
    PayComponent,
    GridComponent,
    FavouriteComponent,
    CommentComponent,
    QrScannerComponent,
    SearchComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    SharedModule,
    ZXingScannerModule,
  ],
  exports: [RouterModule, GridComponent],
  entryComponents: [
    FavouriteComponent,
    CommentComponent,
    QrScannerComponent,
    SearchComponent,
  ],
})
export class TablesModule {}
