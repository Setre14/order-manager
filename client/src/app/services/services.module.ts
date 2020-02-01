import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CommentService } from './comment.service';
import { CommunicationService } from './communication.service';
import { FavTableService } from './fav-table.service';
import { FloorplanService } from './floorplan.service';
import { ItemService } from './item.service';
import { LangService } from './lang.service';
import { LocationService } from './location.service';
import { OrderService } from './order.service';
import { TableService } from './table.service';
import { TypeService } from './type.service';
import { UserService } from './user.service';
import { UtilService } from './util.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    CommentService,
    CommunicationService,
    FavTableService,
    FloorplanService,
    ItemService,
    LangService,
    LocationService,
    OrderService,
    TableService,
    TypeService,
    UserService,
    UtilService
  ]
})
export class ServicesModule { }
