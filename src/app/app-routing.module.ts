import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableOverviewComponent} from './table-overview/table-overview.component';
import {TableComponent} from './table/table.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AdminComponent} from './admin/admin.component';
import {OrderComponent} from './order/order.component';


const routes: Routes = [
  { path: 'table-overview', component: TableOverviewComponent },
  { path: 'table/:table', component: TableComponent },
  { path: 'order/:table', component: OrderComponent },
  { path: 'admin', component: AdminComponent },
  { path: '',   redirectTo: '/table-overview', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
