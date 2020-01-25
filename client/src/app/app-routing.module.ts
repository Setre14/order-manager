import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddComponent } from './component/add/add.component';
import { FloorplanComponent } from './component/floorplan/floorplan.component';
import { OrderComponent } from './component/order/order.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { PayComponent } from './component/pay/pay.component';
import { ServerComponent } from './component/server/server.component';
import { TableOverviewComponent } from './component/table-overview/table-overview.component';
import { TableComponent } from './component/table/table.component';
import { FavouritesComponent } from './component/favourites/favourites.component';


const routes: Routes = [
  { path: 'table-overview', component: TableOverviewComponent },
  { path: 'table/:table', component: TableComponent },
  { path: 'order/:table', component: OrderComponent },
  { path: 'pay/:table', component: PayComponent },
  { path: 'add', component: AddComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'floorplan', component: FloorplanComponent },
  { path: 'server', component: ServerComponent },
  { path: '',   redirectTo: '/table-overview', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
