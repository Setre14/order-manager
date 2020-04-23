import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { LocService } from 'src/app/services/loc.service';
import { Table, Loc } from '../../../../../../../shared';
import { TableService } from 'src/app/services/table.service';
import { UtilService } from 'src/app/services/util.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['../../../../style.scss'],
})
export class ManageAddTableComponent implements OnInit {
  locForm: FormGroup;
  tableForm: FormGroup;

  // location: string;

  // tableName: string;
  // tableLocation: string;

  data: any[];

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private locService: LocService,
    private tableService: TableService,
    private utilService: UtilService
  ) {}

  ngOnInit() {
    this.locForm = this.formBuilder.group({
      name: ['', Validators.required],
    });

    this.tableForm = this.formBuilder.group({
      name: ['', Validators.required],
      locId: ['', Validators.required],
    });

    this.locService.load().then(() => {
      // const locs = this.getLocations();
      // if (locs.length > 0) {
      //   this.tableLocation = locs[0]._id;
      // }
    });
  }

  getLocations(): Loc[] {
    return this.locService.getLocations();
  }

  isLocDefined(): boolean {
    return this.locForm.valid;
  }

  addLocation() {
    if (!this.isLocDefined()) {
      return;
    }

    const loc = this.locForm.value.name;

    this.locService.addLocation(new Loc(loc));
    this.utilService.showToast(`Raum ${loc} hinzugefügt`);
    this.locForm.reset();
  }

  isTableDefined(): boolean {
    return this.tableForm.valid;
  }

  addTable(): void {
    if (!this.isTableDefined()) {
      return;
    }

    const tableValue = this.tableForm.value;

    this.tableService.addTable(new Table(tableValue.name, tableValue.locId));
    const loc = this.locService.getLocation(tableValue.locId);
    this.utilService.showToast(
      `Tisch ${tableValue.name} zu ${loc.name} hinzugefügt`
    );
    this.tableForm.reset();
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
            this.utilService.showToast(`Import abgebrochen`);
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
                `Räume und Tische importiert von Excel`
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
