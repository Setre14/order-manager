import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationService } from 'src/app/service/location.service';
import { TableService } from 'src/app/service/table.service';
import { Table } from '../../../../../shared';

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
    private snackBar: MatSnackBar,
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

    this.openSnackbar('Added location ' + locationData.location)
  }

  onSubmitTable(tableData: any) {
    const table = new Table(tableData.table, tableData.location);

    this.tableService.addTable(table);

    this.openSnackbar('Added Table ' + table.table)
  }

  openSnackbar(text: string) {
    this.snackBar.open(text, '', {
      duration: 2 * 1000,
      verticalPosition: 'bottom'
    });
  }

  close(): void {
    this.dialogRef.close()
  }
}
