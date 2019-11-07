import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableOverviewComponent} from './table-overview/table-overview.component';
import {TableComponent} from './table/table.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: 'table-overview', component: TableOverviewComponent },
  { path: 'table', component: TableComponent },
  { path: '',   redirectTo: '/table-overview', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
