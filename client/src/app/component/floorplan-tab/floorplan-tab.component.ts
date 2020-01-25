import { Component, OnInit, Input } from '@angular/core';
import { FloorplanService } from 'src/app/service/floorplan.service';
import { Floorplan } from '../../../../../shared';
import { GridsterConfig } from 'angular-gridster2';

import { config } from './floorplan-conf';

@Component({
  selector: 'app-floorplan-tab',
  templateUrl: './floorplan-tab.component.html',
  styleUrls: ['./floorplan-tab.component.scss']
})
export class FloorplanTabComponent implements OnInit {
  @Input() location: string;

  rows = 0;
  columns = 0;
  edit = false;

  options: GridsterConfig = {
    ...config
  }

  constructor(
    public floorplanService: FloorplanService
  ) { }

  async ngOnInit() {
    await this.floorplanService.loadFloorplans()

    this.rows = this.getFloorplan().getMaxRow();
    this.columns = this.getFloorplan().getMaxColumn();
    this.changeGrid();
  }

  getFloorplan(): Floorplan {
    return this.floorplanService.getFloorplan(this.location);
  }

  getItems(): any[] {
    return this.getFloorplan().tables;
  }

  changeEdit() {
    this.edit = !this.edit;

    this.options.draggable.enabled = this.edit;
    this.options.resizable.enabled = this.edit;
    if (this.options.api !== undefined) {
      this.options.api.optionsChanged();
    }

    this.rows = this.getFloorplan().getMaxRow();
    this.columns = this.getFloorplan().getMaxColumn();
    this.changeGrid();
  }

  changeGrid() {
    this.options.maxCols = this.columns;
    this.options.minCols = this.columns;

    this.options.maxRows = this.rows;
    this.options.minRows = this.rows;

    if (this.options.api !== undefined) {
      this.options.api.optionsChanged();
    }
  }

  save(): void {
    this.floorplanService.save(this.getFloorplan());
  }
}
