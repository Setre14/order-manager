import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableOverviewComponent} from './component/table-overview/table-overview.component';
import {TableComponent} from './component/table/table.component';
import {PageNotFoundComponent} from './component/page-not-found/page-not-found.component';
import {AdminComponent} from './component/admin/admin.component';
import {OrderComponent} from './component/order/order.component';
import {PayComponent} from './component/pay/pay.component';
import {QrReaderComponent} from './component/qr-reader/qr-reader.component';
import { FloorplanComponent } from './component/floorplan/floorplan.component';


const routes: Routes = [
  { path: 'table-overview', component: TableOverviewComponent },
  { path: 'table/:table', component: TableComponent },
  { path: 'order/:table', component: OrderComponent },
  { path: 'pay/:table', component: PayComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'qr-reader', component: QrReaderComponent },
  { path: 'floorplan', component: FloorplanComponent },
  { path: '',   redirectTo: '/table-overview', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
