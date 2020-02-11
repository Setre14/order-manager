import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocService } from 'src/app/services/loc.service';
import { Table, Loc } from '../../../../../../../shared';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.scss'],
})
export class ManageAddTableComponent implements OnInit {
  location: string;

  tableName: string;
  tableLocation: string;

  constructor(
    private modalCtrl: ModalController,
    private locationService: LocService,
    private tableService: TableService
  ) { }

  ngOnInit() {
    this.locationService.load().then(() => {
      const locs = this.getLocations();
      if (locs.length > 0) {
        this.tableLocation = locs[0]._id;
      }
    });
  }

  getLocations(): Loc[] {
    return this.locationService.getLocations();
  }

  addLocation() {
    this.locationService.addLocation(new Loc(this.location));
    this.location = '';
  }

  isTableDefined(): boolean {
    if (!this.tableName || !this.tableLocation) {
      return false;
    }

    return true;
  }

  addTable(): void {
    if (!this.isTableDefined()) {
      return;
    }

    this.tableService.addTable(new Table(this.tableName, this.tableLocation));
    this.tableName = ''
  }

  close(): void {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}