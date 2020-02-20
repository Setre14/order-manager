import { Component, OnInit } from '@angular/core';
import { LocService } from 'src/app/services/loc.service';
import { TableService } from 'src/app/services/table.service';
import { ModalController } from '@ionic/angular';
import { ManageAddTableComponent } from '../add/add-table/add-table.component';
import { CommunicationService } from 'src/app/services/communication.service';
import { RestAPI, RestAction, Loc, Table } from '../../../../../../shared';

@Component({
  selector: 'app-manage-table',
  templateUrl: './table.component.html',
  styleUrls: ['../../../style.scss'],
})
export class ManageTableComponent implements OnInit {
  expandedLoc: string;

  constructor(
    private modalCtrl: ModalController,
    private locService: LocService,
    private tableService: TableService
  ) {}

  ngOnInit() {
    this.locService.load();
    this.tableService.load();
  }

  getLocations(): Loc[] {
    return this.locService.getLocations();
  }

  expand(loc: string): void {
    this.expandedLoc = this.expandedLoc == loc ? '' : loc;
  }

  isExpanded(loc: string): boolean {
    return this.expandedLoc == loc;
  }

  getTables(loc: Loc): Table[] {
    return this.tableService.getLocTables(loc._id);
  }

  getTableNames(loc: Loc): string[] {
    return this.tableService.getLocTableNames(loc._id);
  }

  deleteLoc(loc: Loc): void {
    this.locService.deleteLocation(loc._id);
  }

  deleteTable(table: Table): void {
    this.tableService.delete(table._id);
  }

  async add(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ManageAddTableComponent,
    });
    await modal.present();
  }
}
