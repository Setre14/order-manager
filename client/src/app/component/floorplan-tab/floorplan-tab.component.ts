import { Component, OnInit, Input } from '@angular/core';
import { FloorplanService } from 'src/app/service/floorplan.service';
import { Floorplan } from '../../../../../shared';
import { GridsterConfig, DisplayGrid, GridType, CompactType } from 'angular-gridster2';

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
    gridType: GridType.Fit,
    compactType: CompactType.None,
    margin: 10,
    outerMargin: true,
    outerMarginTop: null,
    outerMarginRight: null,
    outerMarginBottom: null,
    outerMarginLeft: null,
    useTransformPositioning: true,
    mobileBreakpoint: 0,
    minCols: 1,
    maxCols: 100,
    minRows: 5,
    maxRows: 100,
    maxItemCols: 100,
    minItemCols: 1,
    maxItemRows: 100,
    minItemRows: 1,
    maxItemArea: 2500,
    minItemArea: 1,
    defaultItemCols: 1,
    defaultItemRows: 1,
    fixedColWidth: 105,
    fixedRowHeight: 105,
    keepFixedHeightInMobile: false,
    keepFixedWidthInMobile: false,
    scrollSensitivity: 10,
    scrollSpeed: 20,
    enableEmptyCellClick: false,
    enableEmptyCellContextMenu: false,
    enableEmptyCellDrop: false,
    enableEmptyCellDrag: false,
    enableOccupiedCellDrop: false,
    emptyCellDragMaxCols: 50,
    emptyCellDragMaxRows: 50,
    ignoreMarginInRow: false,
    draggable: {
      enabled: this.edit,
    },
    resizable: {
      enabled: this.edit,
    },
    swap: true,
    pushItems: false,
    disablePushOnDrag: false,
    disablePushOnResize: false,
    pushDirections: {north: true, east: true, south: true, west: true},
    pushResizeItems: false,
    displayGrid: DisplayGrid.Always,
    disableWindowResize: false,
    disableWarnings: false,
    scrollToNewItems: false
  };

  constructor(
    public floorplanService: FloorplanService
  ) { }

  ngOnInit() {
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
    this.options.api.optionsChanged();

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
