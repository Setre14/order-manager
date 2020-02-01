import { Component, OnInit } from '@angular/core';
import { TypeService } from 'src/app/services/type.service';
import { ItemService } from 'src/app/services/item.service';
import { Item } from '../../../../../../shared';
import { ManageAddItemComponent } from '../add/add-item/add-item.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-manage-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ManageItemComponent implements OnInit {
  expandedType: string;

  constructor(
    private modalCtrl: ModalController,
    private typeService: TypeService,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.typeService.loadTypes();
    this.itemService.loadItems();
  }

  getTypes(): string[] {
    return this.typeService.getTypes();
  }

  getItems(type: string): Item[] {
    return this.itemService.getItemsByType(type);
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

  async add(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ManageAddItemComponent
    });
    await modal.present();
  }
}
