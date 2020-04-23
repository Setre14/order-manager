import {
  GridsterConfig,
  DisplayGrid,
  GridType,
  CompactType,
} from 'angular-gridster2';

const config: GridsterConfig = {
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
    enabled: false,
  },
  resizable: {
    enabled: false,
  },
  swap: true,
  pushItems: false,
  disablePushOnDrag: false,
  disablePushOnResize: false,
  pushDirections: { north: true, east: true, south: true, west: true },
  pushResizeItems: false,
  displayGrid: DisplayGrid.Always,
  disableWindowResize: false,
  disableWarnings: false,
  scrollToNewItems: false,
};

export { config };
