import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableOverviewComponent } from './table-overview/table-overview.component';
import { TableComponent } from './table/table.component';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule, MatInputModule} from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';

import {OverlayModule} from '@angular/cdk/overlay';
import { SearchComponent } from './search/search.component';
import {MatFormFieldModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { FavouritesComponent } from './favourites/favourites.component';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import { OrderComponent } from './order/order.component';
import { PayComponent } from './pay/pay.component';
import { AutoFocusDirective } from './auto-focus/auto-focus.directive';
import {MatSelectModule} from '@angular/material/select';
import { CurrencyPipe } from './currency.pipe';

import { registerLocaleData } from '@angular/common';
import localeAt from '@angular/common/locales/de-AT';

registerLocaleData(localeAt);

@NgModule({
  declarations: [
    AppComponent,
    TableOverviewComponent,
    TableComponent,
    PageNotFoundComponent,
    AdminComponent,
    SearchComponent,
    NavbarComponent,
    FavouritesComponent,
    OrderComponent,
    PayComponent,
    AutoFocusDirective,
    CurrencyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    OverlayModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTableModule,
    MatSelectModule
  ],
  entryComponents: [
    SearchComponent,
    FavouritesComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
