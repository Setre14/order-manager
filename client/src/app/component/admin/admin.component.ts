import { Component, OnInit } from '@angular/core';
import { TypeService } from 'src/app/service/type.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemService } from 'src/app/service/item.service';
import { MatSnackBar } from '@angular/material';
import { Item, RestAPI, RestAction, Table } from '../../../../../shared';
import { CommunicationService } from 'src/app/service/communication.service';
import { TableOverviewService } from 'src/app/service/table-overview.service';
import { LocationService } from 'src/app/service/location.service';
import { LangService } from 'src/app/service/lang.service';

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
  typeForm: FormGroup;
  locationForm: FormGroup;
  tableForm: FormGroup;

  constructor(
    public itemService: ItemService,
    public typeService: TypeService,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public comService: CommunicationService,
    public locationService: LocationService,
    public tableOverviewService: TableOverviewService,
    public langService: LangService
  ) {
    this.itemForm = this.formBuilder.group({
      name: '',
      price: 0,
      type: ''
    });

    this.typeForm = this.formBuilder.group({
      type: ''
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
    this.locationService.loadLocations();
    this.tableOverviewService.loadTables();
    this.langService.setTitle('Admin');
  }

  getTypes(): string[] {
    return this.typeService.types;
  }

  getItems(): Item[] {
    return this.itemService.getItems();
  }

  onSubmitItem(itemData: Item) {
    if (itemData.type === '') {
      return;
    }

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

  onSubmitType(type: any) {
    this.comService.post(RestAPI.TYPE, RestAction.INSERT, type);
  }

  onSubmitLocation(locationData: any) {
    this.locationService.addLocation(locationData.location);

    this.locationForm.reset();
  }

  getLocations(): string[] {
    return this.locationService.getLocations();
  }

  deleteLocation(location: string): void {
    this.locationService.deleteLocation(location);
  }

  getTables(): Table[] {
    return this.tableOverviewService.getTables();
  }

  onSubmitTable(tableData: any) {
    const table = new Table(tableData.table, tableData.location);

    this.tableOverviewService.addTable(table);
  }
}
