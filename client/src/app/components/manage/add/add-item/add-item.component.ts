import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TypeService } from 'src/app/services/type.service';
import { ItemService } from 'src/app/services/item.service';
import { Item, Type } from '../../../../../../../shared';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class ManageAddItemComponent implements OnInit {
  type: string;

  itemName: string;
  itemType: string;
  itemPrice: number;

  constructor(
    private modalCtrl: ModalController,
    private typeService: TypeService,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.typeService.load().then(() => {
      this.itemType = this.getTypes()[0]._id;
    });
  }

  getTypes(): Type[] {
    return this.typeService.getTypes();
  }

  addType() {
    this.typeService.addType(this.type);
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

    this.itemService.addItem(new Item(this.itemName, this.itemType, this.itemPrice));
    this.itemName = ''
    this.itemPrice = undefined;
  }

  close(): void {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
