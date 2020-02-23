import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { TypeService } from 'src/app/services/type.service';
import { ItemService } from 'src/app/services/item.service';
import { Item, Type } from '../../../../../../../shared';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['../../../../style.scss'],
})
export class ManageAddItemComponent implements OnInit {
  type: string;

  itemName: string;
  itemType: string;
  itemPrice: number;

  data: any[];

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private typeService: TypeService,
    private itemService: ItemService,
    private utilService: UtilService
  ) {}

  ngOnInit() {
    this.typeService.load().then(() => {
      const types = this.getTypes();
      if (types.length > 0) {
        this.itemType = this.getTypes()[0]._id;
      }
    });
  }

  getTypes(): Type[] {
    return this.typeService.getTypes();
  }

  addType() {
    this.typeService.addType(this.type);
    this.utilService.showToast(`Added Type ${this.type}`);
    this.type = '';
  }

  isItemDefined(): boolean {
    if (!this.itemName || !this.itemPrice || !this.itemType) {
      return false;
    }

    return true;
  }

  addItem(): void {
    if (!this.isItemDefined()) {
      return;
    }

    this.itemService.addItem(
      new Item(this.itemName, this.itemType, this.itemPrice)
    );
    const type = this.typeService.getType(this.itemType);
    this.utilService.showToast(`Added Item ${this.itemName} to ${type.name}`);
    this.itemName = '';
    this.itemPrice = undefined;
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
        'Import from Excel will <strong>delete</strong> all existing Types and Items',
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
            this.typeService.disableAll().then(() => {
              this.data.forEach(i => {
                const type = this.typeService.addType(i.type);
                this.itemService.addItem(
                  new Item(i.name, type._id, i.price, i.station)
                );
              });
              this.utilService.showToast(`Imported Types and Items from Excel`);

              this.close();
            })
          },
        },
      ],
    });

    alert.present();
  }

  close(): void {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
