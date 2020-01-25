import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { OverlayModule} from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { registerLocaleData } from '@angular/common';
import localeAt from '@angular/common/locales/de-AT';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule} from '@angular/material/tabs';
import { MatDialogModule} from '@angular/material/dialog';
import { MatListModule} from '@angular/material/list';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { GridsterModule } from 'angular-gridster2';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';

import {ZXingScannerModule} from '@zxing/ngx-scanner';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TableOverviewComponent } from './component/table-overview/table-overview.component';
import { TableComponent } from './component/table/table.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { AddComponent } from './component/add/add.component';
import { AddItemComponent } from './component/add-item/add-item.component';
import { AddTableComponent } from './component/add-table/add-table.component';
import { SearchComponent } from './component/search/search.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FavouritesComponent } from './component/favourites/favourites.component';
import { OrderComponent } from './component/order/order.component';
import { PayComponent } from './component/pay/pay.component';
import { QrReaderComponent } from './component/qr-reader/qr-reader.component';
import { OrderTableComponent } from './component/order-table/order-table.component';
import { TableTableComponent } from './component/table-table/table-table.component';
import { FloorplanComponent } from './component/floorplan/floorplan.component';
import { FloorplanTabComponent } from './component/floorplan-tab/floorplan-tab.component';
import { TableOverviewGridComponent } from './component/table-overview-grid/table-overview-grid.component';
import { ServerComponent } from './component/server/server.component';

import { AutoFocusDirective } from './directive/auto-focus.directive';
import { LongPressDirective } from './directive/long-press.directive';

import { CurrencyPipe } from './pipe/currency.pipe';
import { AddTableRefComponent } from './component/add-table-ref/add-table-ref.component';
import { AddItemRefComponent } from './component/add-item-ref/add-item-ref.component';

registerLocaleData(localeAt);

@NgModule({
  declarations: [
    AppComponent,
    TableOverviewComponent,
    TableComponent,
    PageNotFoundComponent,
    AddComponent,
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
    AddItemComponent,
    AddTableComponent,
    AddTableRefComponent,
    AddItemRefComponent,
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
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatExpansionModule
  ],
  entryComponents: [
    SearchComponent,
    QrReaderComponent,
    AddTableRefComponent,
    AddItemRefComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
