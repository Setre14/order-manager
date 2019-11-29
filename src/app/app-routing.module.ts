import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableOverviewComponent} from './component/table-overview/table-overview.component';
import {TableComponent} from './component/table/table.component';
import {PageNotFoundComponent} from './component/page-not-found/page-not-found.component';
import {AdminComponent} from './component/admin/admin.component';
import {OrderComponent} from './component/order/order.component';
import {PayComponent} from './component/pay/pay.component';


const routes: Routes = [
  { path: 'table-overview', component: TableOverviewComponent },
  { path: 'table/:table', component: TableComponent },
  { path: 'order/:table', component: OrderComponent },
  { path: 'pay', component: PayComponent },
  { path: 'admin', component: AdminComponent },
  { path: '',   redirectTo: '/table-overview', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
