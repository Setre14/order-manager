import { Component, OnInit } from '@angular/core';
import { Item } from '../../../../../shared';
import { TypeService } from 'src/app/service/type.service';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  
  constructor(
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

  getItemsByType(type: string): Item[] {
    return this.itemService.getItemsByType(type);
  }
}
