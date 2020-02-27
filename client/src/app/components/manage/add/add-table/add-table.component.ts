import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { LocService } from 'src/app/services/loc.service';
import { Table, Loc } from '../../../../../../../shared';
import { TableService } from 'src/app/services/table.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['../../../../style.scss'],
})
export class ManageAddTableComponent implements OnInit {
  location: string;

  tableName: string;
  tableLocation: string;

  data: any[];

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
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
    this.utilService.showToast(`Added Location ${this.location}`);
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
    const loc = this.locService.getLocation(this.tableLocation);
    this.utilService.showToast(`Added Table ${this.tableName} to ${loc.name}`);
    this.tableName = '';
  }

  setData(d) {
    this.data = d;
  }

  hasData(): boolean {
    return this.data !== undefined;
  }

  async import() {
    const alert = await this.alertCtrl.create({
      header: 'Import from Excel',
      message:
        'Import from Excel will <strong>delete</strong> all existing Locations and Tables',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.utilService.showToast(`Canceled import`);
          },
        },
        {
          text: 'Import',
          handler: () => {
            this.locService.disableAll().then(() => {
              this.data.forEach(t => {
                const loc = this.locService.addLocation(new Loc(t.location));
                const table = new Table(t.table, loc._id);
                this.tableService.addTable(table);
              });
              this.utilService.showToast(
                `Imported Locations and Tables from Excel`
              );

              this.close();
            });
          },
        },
      ],
    });

    await alert.present();
  }

  close(): void {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
