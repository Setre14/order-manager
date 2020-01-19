import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableOverviewComponent } from './component/table-overview/table-overview.component';
import { TableComponent } from './component/table/table.component';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule, MatInputModule} from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { AdminComponent } from './component/admin/admin.component';

import {OverlayModule} from '@angular/cdk/overlay';
import { SearchComponent } from './component/search/search.component';
import {MatFormFieldModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FavouritesComponent } from './component/favourites/favourites.component';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import { OrderComponent } from './component/order/order.component';
import { PayComponent } from './component/pay/pay.component';
import { AutoFocusDirective } from './directive/auto-focus.directive';
import {MatSelectModule} from '@angular/material/select';
import { CurrencyPipe } from './pipe/currency.pipe';

import { registerLocaleData } from '@angular/common';
import localeAt from '@angular/common/locales/de-AT';
import { QrReaderComponent } from './component/qr-reader/qr-reader.component';
import {ZXingScannerModule} from '@zxing/ngx-scanner';

import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import { OrderTableComponent } from './component/order-table/order-table.component';
import { LongPressDirective } from './directive/long-press.directive';
import {MatListModule} from '@angular/material/list';
import { TableTableComponent } from './component/table-table/table-table.component';
import { FloorplanComponent } from './component/floorplan/floorplan.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { GridsterModule } from 'angular-gridster2';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FloorplanTabComponent } from './component/floorplan-tab/floorplan-tab.component';
import { TableOverviewGridComponent } from './component/table-overview-grid/table-overview-grid.component';
import { ServerComponent } from './component/server/server.component';

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
    CurrencyPipe,
    QrReaderComponent,
    OrderTableComponent,
    LongPressDirective,
    TableTableComponent,
    FloorplanComponent,
    FloorplanTabComponent,
    TableOverviewGridComponent,
    ServerComponent,
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
    MatSelectModule,
    ZXingScannerModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatDialogModule,
    MatListModule,
    DragDropModule,
    GridsterModule,
    MatSlideToggleModule
  ],
  entryComponents: [
    SearchComponent,
    FavouritesComponent,
    QrReaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
