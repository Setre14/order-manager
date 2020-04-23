import { DBElem } from './dbElem';

export class Floorplan extends DBElem {
  location: string = '';
  tables: {
    tableId: string;
    x: number;
    y: number;
    rows: number;
    cols: number;
  }[] = [];

  addTables(tableIds: string[]) {
    let i = this.tables.length;
    tableIds.forEach(tableId => {
      this.tables.push({
        tableId: tableId,
        x: i,
        y: 0,
        rows: 2,
        cols: 1,
      });
      i++;
    });
  }

  getMaxColumn(): number {
    let maxColumn = 0;

    this.tables.forEach(table => {
      if (table.x + table.cols > maxColumn) {
        maxColumn = table.x + table.cols;
      }
    });

    return maxColumn;
  }

  getMaxRow(): number {
    let maxRow = 0;

    this.tables.forEach(table => {
      if (table.y + table.rows > maxRow) {
        maxRow = table.y + table.rows;
      }
    });

    return maxRow;
  }

  static fromJson(obj: Floorplan): Floorplan {
    const floorplan = new Floorplan();
    floorplan._id = obj._id;
    floorplan.location = obj.location;
    floorplan.tables = obj.tables;
    floorplan.disabled = obj.disabled;

    return floorplan;
  }
}
