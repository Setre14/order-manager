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

  data: any[];

  constructor(
    private modalCtrl: ModalController,
    private typeService: TypeService,
    private itemService: ItemService
  ) { }

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

  setData(d) {
    this.data = d;
  }

  hasData(): boolean {
    return this.data !== undefined;
  }

  import() {
    this.data.forEach(i => {
      const type = this.typeService.addType(i.type);
      this.itemService.addItem(new Item(i.name, type._id, i.price, i.station))
    })
  }

  close(): void {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
