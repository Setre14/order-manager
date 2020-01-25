import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationService } from 'src/app/service/location.service';
import { TableService } from 'src/app/service/table.service';
import { Table } from '../../../../../shared';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-add-table-ref',
  templateUrl: './add-table-ref.component.html',
  styleUrls: ['./add-table-ref.component.scss']
})
export class AddTableRefComponent implements OnInit {
  locationForm: FormGroup;
  tableForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddTableRefComponent>,
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private locationService: LocationService,
    private tableService: TableService
  ) {
    this.locationForm = this.formBuilder.group({
      location: ''
    });
    this.tableForm = this.formBuilder.group({
      table: '',
      location: ''
    });
  }

  ngOnInit() {
  }

  getLocations(): string[] {
    return this.locationService.getLocations();
  }

  onSubmitLocation(locationData: any) {   
    this.locationService.addLocation(locationData.location);

    this.locationForm.reset();

    this.utilService.showSnackbar('Added location ' + locationData.location)
  }

  onSubmitTable(tableData: any) {
    const table = new Table(tableData.table, tableData.location);

    this.tableService.addTable(table);

    this.utilService.showSnackbar('Added Table ' + table.table)
  }

  close(): void {
    this.dialogRef.close()
  }
}
