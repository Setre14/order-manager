import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { TypeService } from 'src/app/services/type.service';
import { ItemService } from 'src/app/services/item.service';
import { Item, ItemType } from '../../../../../../../shared';
import { UtilService } from 'src/app/services/util.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['../../../../style.scss'],
})
export class ManageAddItemComponent implements OnInit {
  typeForm: FormGroup;
  itemForm: FormGroup;

  data: any[];

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private typeService: TypeService,
    private itemService: ItemService,
    private utilService: UtilService
  ) {}

  ngOnInit() {
    this.typeForm = this.formBuilder.group({
      name: ['', Validators.required],
    });

    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      typeId: ['', Validators.required],
      station: [''],
      active: [true],
    });

    this.typeService.load().then(() => {
      // const types = this.getTypes();
      // if (types.length > 0) {
      //   this.typeForm.value.name = this.getTypes()[0]._id;
      // }
    });
  }

  getTypes(): ItemType[] {
    return this.typeService.getTypes();
  }

  isTypeDefined(): boolean {
    return this.typeForm.valid;
  }

  addType() {
    if (!this.isTypeDefined()) {
      return;
    }

    const type = this.typeForm.value.name;

    this.typeService.addType(type);
    this.utilService.showToast(`Typ ${type} hinzugefügt`);
    this.typeForm.reset();
  }

  isItemDefined(): boolean {
    return this.itemForm.valid;
  }

  addItem(): void {
    if (!this.isItemDefined()) {
      return;
    }

    const item = this.itemForm.value;

    this.itemService.addItem(new Item(item.name, item.typeId, item.price));
    const type = this.typeService.getType(item.typeId);
    this.utilService.showToast(`Item ${item.name} zu ${type.name} hinzugefügt`);
    this.itemForm.reset();
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
            this.utilService.showToast(`Import abgebrochen`);
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
              this.utilService.showToast(`Typen und Items importier von Excel`);

              this.close();
            });
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
