import { Component, OnInit, AfterContentInit } from '@angular/core';
import { TypeService } from 'src/app/service/type.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemService } from 'src/app/service/item.service';
import { MatSnackBar } from '@angular/material';
import { Item, Table } from '../../../../../shared';
import { CommunicationService } from 'src/app/service/communication.service';
import { TableOverviewService } from 'src/app/service/table-overview.service';
import { TableService } from 'src/app/service/table.service';

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

  TABLE_COLUMNS = [
    'table',
    'location'
  ];

  itemForm: FormGroup;
  serverForm: FormGroup;
  locationForm: FormGroup;
  tableForm: FormGroup;

  constructor(
    public itemService: ItemService,
    public typeService: TypeService,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public comService: CommunicationService,
    public tableService: TableService,
    public tableOverviewService: TableOverviewService
  ) {
    this.itemForm = this.formBuilder.group({
      name: '',
      price: 0,
      type: ''
    });

    this.serverForm = this.formBuilder.group({
      url: ''
    });
    this.locationForm = this.formBuilder.group({
      location: ''
    });
    this.tableForm = this.formBuilder.group({
      table: '',
      location: ''
    });
  }

  ngOnInit() {
    this.typeService.loadTypes();
    this.tableService.loadLocations();
    this.tableOverviewService.loadTables();
  }

  getTypes(): string[] {
    return this.typeService.types;
  }

  getItems(): Item[] {
    return this.itemService.getItems();
  }

  onSubmitItem(itemData: Item) {
    itemData.name = itemData.name.trim();

    this.itemService.getItems().forEach(item => {
      if (item.name === itemData.name) {
        this.snackBar.open('Item ' + itemData.name + ' already exists', '', {
          duration: 2 * 1000,
          verticalPosition: 'top'
        });
        return;
      }
    });

    this.itemService.addItem(itemData);

    this.itemForm.reset({
      name: '',
      price: 0,
      type: itemData.type
    });
  }

  getServerUrl(): string {
    return this.comService.url;
  }

  onSubmitServer(serverData: any) {
    this.comService.url = serverData.url;
  }

  onSubmitLocation(locationData: any) {
    this.tableService.addLocation(locationData.location);

    this.locationForm.reset();
  }

  getLocations(): string[] {
    return this.tableService.getLocations();
  }

  deleteLocation(location: string): void {
    this.tableService.deleteLocation(location);
  }

  getTables(): Table[] {
    return this.tableOverviewService.getTables();
  }

  onSubmitTable(tableData: any) {
    const table = new Table(tableData.table, tableData.location);

    this.tableOverviewService.addTable(table);
  }
}
