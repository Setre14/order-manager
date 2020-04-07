import { Component, OnInit } from '@angular/core';
import { LocService } from 'src/app/services/loc.service';
import { Loc, Floorplan } from '../../../../../shared';

import { config } from './floorplan-conf';
import { FloorplanService } from 'src/app/services/floorplan.service';
import { GridsterConfig } from 'angular-gridster2';
import { TableService } from 'src/app/services/table.service';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-floorplan',
  templateUrl: './floorplan.component.html',
  styleUrls: ['../../style.scss'],
})
export class FloorplanComponent implements OnInit {
  floorplanForm: FormGroup;
  activeTab: string;

  options: GridsterConfig = {
    ...config,
  };

  edit = false;
  showEdit = false;

  constructor(
    private formBuilder: FormBuilder, 
    private locService: LocService,
    private floorplanService: FloorplanService,
    private tableService: TableService,
    private userService: UserService
  ) { }

  async ngOnInit() {
    await this.locService.load();
    await this.tableService.load();
    await this.floorplanService.load();

    this.floorplanForm = this.formBuilder.group({
      rows: [this.getFloorplan().getMaxRow()],
      columns: [this.getFloorplan().getMaxColumn()],
    });
    this.changeGrid();
  }

  getLocations(): Loc[] {
    const locs = this.locService.getLocations();

    if (locs.length >= 1 && !this.activeTab) {
      this.activeTab = locs[0]._id;
    }

    return locs;
  }

  segmentChanged(event: any): void {
    this.activeTab = event.detail.value;
    this.floorplanForm.value.rows = this.getFloorplan().getMaxRow();
    this.floorplanForm.value.columns = this.getFloorplan().getMaxColumn();
    this.changeGrid();
  }

  getFloorplan(): Floorplan {
    return this.floorplanService.getFloorplan(this.activeTab);
  }

  getItems(): any[] {
    return this.getFloorplan().tables;
  }

  getTableName(tableId: string): string {
    return this.tableService.getTable(tableId).name;
  }

  changeGrid() {
    this.options.maxCols = this.floorplanForm.value.columns;
    this.options.minCols = this.floorplanForm.value.columns;

    this.options.maxRows = this.floorplanForm.value.rows;
    this.options.minRows = this.floorplanForm.value.rows;

    if (this.options.api !== undefined) {
      this.options.api.optionsChanged();
    }
  }

  toggleShowEdit() {
    this.showEdit = !this.showEdit;
  }

  changeEdit(event) {
    this.edit = event.detail.checked;

    this.options.draggable.enabled = this.edit;
    this.options.resizable.enabled = this.edit;
    if (this.options.api !== undefined) {
      this.options.api.optionsChanged();
    }

    this.floorplanForm.value.rows = this.getFloorplan().getMaxRow();
    this.floorplanForm.value.columns = this.getFloorplan().getMaxColumn();
    this.changeGrid();
  }

  isAdmin(): boolean {
    return this.userService.isAdmin();
  }

  save(): void {
    this.floorplanService.save(this.getFloorplan());
  }
}
