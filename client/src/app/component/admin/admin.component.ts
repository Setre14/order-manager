import { Component, OnInit, AfterContentInit } from '@angular/core';
import { TypeService } from 'src/app/service/type.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemService } from 'src/app/service/item.service';
import { MatSnackBar } from '@angular/material';
import { Item } from '../../../../../shared';
import { CommunicationService } from 'src/app/service/communication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: [
    './admin.component.scss',
    '../../style/style.scss'
  ]
})
export class AdminComponent implements OnInit {
  ORDER_COLUMNS = [
    'item',
    'type',
    'price'
  ];

  itemForm: FormGroup;
  serverForm: FormGroup;

  constructor(
    public itemService: ItemService,
    public typeService: TypeService,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public comService: CommunicationService
  ) { 
    this.itemForm = this.formBuilder.group({
      name: '',
      price: 0,
      type: ''
    });

    this.serverForm = this.formBuilder.group({
      url: ''
    });
  }

  ngOnInit() {
    this.typeService.loadTypes();
  }

  getTypes(): string[] {
    return this.typeService.types;
  }

  getItems(): Item[] {
    return this.itemService.getItems();
  }

  onSubmitItem(itemData: Item) {
    itemData.name = itemData.name.trim()

    this.itemService.getItems().forEach(item => {
      if (item.name == itemData.name) {
        this.snackBar.open('Item ' + itemData.name + ' already exists', '', {
          duration: 2 * 1000,
          verticalPosition: 'top'
        });
        return;
      }
    })

    this.itemService.addItem(itemData);

    this.itemForm.reset({
      name: '',
      price: 0,
      type: itemData.type
    });
  }

  getServerUrl(): string {
    return this.comService.url
  }

  onSubmitServer(serverData: any) {
    this.comService.url = serverData.url;
    console.log(this.getServerUrl())
  }
}
