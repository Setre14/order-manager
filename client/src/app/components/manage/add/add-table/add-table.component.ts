import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocationService } from 'src/app/services/location.service';
import { Table } from '../../../../../../../shared';
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
    private locationService: LocationService,
    private tableService: TableService
  ) { }

  ngOnInit() {
    this.locationService.loadLocations().then(() => {
      this.tableLocation = this.getLocations()[0];
    });
  }

  getLocations(): string[] {
    return this.locationService.getLocations();
  }

  addLocation() {
    this.locationService.addLocation(this.location);
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
