import { Component, OnInit } from '@angular/core';
import { TypeService } from 'src/app/services/type.service';
import { ItemService } from 'src/app/services/item.service';
import { Item, ItemType } from '../../../../../../shared';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-manage-item',
  templateUrl: './item.component.html',
  styleUrls: ['../../../style.scss'],
})
export class ManageItemComponent implements OnInit {
  expandedType: string;

  constructor(
    private modalCtrl: ModalController,
    private typeService: TypeService,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.typeService.load();
    this.itemService.load();
  }

  getTypes(): ItemType[] {
    return this.typeService.getTypes();
  }

  getItems(type: ItemType): Item[] {
    return this.itemService.getItemsByType(type._id);
  }

  toggleActive(item: Item) {
    this.itemService.toggleItem(item);
  }

  expand(type: string): void {
    this.expandedType = this.expandedType == type ? '' : type;
  }

  isExpanded(type: string): boolean {
    return this.expandedType == type;
  }

  deleteType(type: ItemType): void {
    this.typeService.disable(type._id);
  }

  deleteItem(item: Item): void {
    this.itemService.disable(item);
  }
}
