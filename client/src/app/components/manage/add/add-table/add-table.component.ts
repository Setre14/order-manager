import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocService } from 'src/app/services/loc.service';
import { Table, Loc } from '../../../../../../../shared';
import { TableService } from 'src/app/services/table.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.scss'],
})
export class ManageAddTableComponent implements OnInit {
  location: string;

  tableName: string;
  tableLocation: string;

  data: any[];

  constructor(
    private modalCtrl: ModalController,
    private locService: LocService,
    private tableService: TableService,
    private utilService: UtilService
  ) {}

  ngOnInit() {
    this.locService.load().then(() => {
      const locs = this.getLocations();
      if (locs.length > 0) {
        this.tableLocation = locs[0]._id;
      }
    });
  }

  getLocations(): Loc[] {
    return this.locService.getLocations();
  }

  addLocation() {
    this.locService.addLocation(new Loc(this.location));
    this.utilService.showToast(`Added Location ${this.location}`)
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
    const loc = this.locService.getLocation(this.tableLocation)
    this.utilService.showToast(`Added Table ${this.tableName} to ${loc.name}`)
    this.tableName = '';
  }

  setData(d) {
    this.data = d;
  }

  hasData(): boolean {
    return this.data !== undefined;
  }

  import() {
    this.data.forEach(t => {
      const loc = this.locService.addLocation(new Loc(t.location));
      const table = new Table(t.table, loc._id);
      this.tableService.addTable(table);
    });
    this.utilService.showToast(`Imported Locations and Tables from Excel`)
  }

  close(): void {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
