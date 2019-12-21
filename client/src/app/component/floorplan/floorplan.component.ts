import { Component, OnInit } from '@angular/core';
import { TableOverviewService } from 'src/app/service/table-overview.service';
import { GridsterConfig, DisplayGrid, GridType, CompactType } from 'angular-gridster2';
import { FloorplanService } from 'src/app/service/floorplan.service';
import { Floorplan } from '../../../../../shared/src';
import { LocationService } from 'src/app/service/location.service';

@Component({
  selector: 'app-floorplan',
  templateUrl: './floorplan.component.html',
  styleUrls: ['./floorplan.component.scss']
})
export class FloorplanComponent implements OnInit {
  rows = 0;
  columns = 0;

  tablePlan: string[][] = [];

  disableSort = true;

  floorplan: Floorplan;

  options: GridsterConfig;

  constructor(
    public tableOverviewService: TableOverviewService,
    public floorplanService: FloorplanService,
    public locationService: LocationService
  ) {
    this.options = {
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
        enabled: true,
      },
      resizable: {
        enabled: true,
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
  }

  async ngOnInit() {
    await this.tableOverviewService.loadTables();
    await this.floorplanService.loadFloorplans();
    await this.locationService.loadLocations();

    // this.floorplan = this.floorplanService.getFloorplan('Halle A');
    // this.items = this.floorplan.tables;

    // this.rows = this.floorplan.getMaxRow();
    // this.columns = this.floorplan.getMaxColumn();

    // this.options.maxItemCols = this.columns;
    // this.options.minItemCols = this.columns;

    // this.options.maxCols = this.columns;
    // this.options.minCols = this.columns;

    // this.options.maxItemRows = this.rows;
    // this.options.minItemRows = this.rows;

    // this.options.maxRows = this.rows;
    // this.options.minRows = this.rows;
  }

  getFloorplan(location: string): Floorplan {
    if (this.floorplan === undefined || this.floorplan.location !== location) {
      this.floorplan = this.floorplanService.getFloorplan(location);
    }

    return this.floorplan;
  }

  getItems(location: string): any[] {
    return this.getFloorplan(location).tables;
  }

  getLocations(): string[] {
    return this.locationService.getLocations();

  }


  // changeGrid() {
  // }

  save(location: string): void {
    this.floorplanService.save(this.getFloorplan(location));
  }
}
