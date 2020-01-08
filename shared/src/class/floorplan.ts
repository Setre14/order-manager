export class Floorplan {
    location: string = '';
    tables: {
        label: string,
        x: number,
        y: number, 
        rows: number, 
        cols: number
    }[] = [];

    addTables(tables: string[]) {
        let i = this.tables.length;
        tables.forEach(tables => {
            this.tables.push({
                label: tables,
                x: i,
                y: 0,
                rows: 2,
                cols: 1
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
}