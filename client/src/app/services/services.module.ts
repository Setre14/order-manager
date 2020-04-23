import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { CommentService } from './comment.service';
import { CommunicationService } from './communication.service';
import { FavTableService } from './fav-table.service';
import { FloorplanService } from './floorplan.service';
import { ItemService } from './item.service';
import { LocService } from './loc.service';
import { OrderService } from './order.service';
import { TableService } from './table.service';
import { TypeService } from './type.service';
import { UserService } from './user.service';
import { UtilService } from './util.service';
import { StorageService } from './storage.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, IonicStorageModule.forRoot()],
  providers: [
    CommentService,
    CommunicationService,
    FavTableService,
    FloorplanService,
    ItemService,
    LocService,
    OrderService,
    StorageService,
    TableService,
    TypeService,
    UserService,
    UtilService,
  ],
})
export class ServicesModule {}
