"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Floorplan = /** @class */ (function () {
    function Floorplan() {
        this.location = '';
        this.tables = [];
    }
    Floorplan.prototype.addTables = function (tables) {
        var _this = this;
        var i = this.tables.length;
        tables.forEach(function (tables) {
            _this.tables.push({
                label: tables,
                x: i,
                y: 0,
                rows: 2,
                cols: 1
            });
            i++;
        });
    };
    Floorplan.prototype.getMaxColumn = function () {
        var maxColumn = 0;
        this.tables.forEach(function (table) {
            if (table.x + table.cols > maxColumn) {
                maxColumn = table.x + table.cols;
            }
        });
        return maxColumn;
    };
    Floorplan.prototype.getMaxRow = function () {
        var maxRow = 0;
        this.tables.forEach(function (table) {
            if (table.y + table.rows > maxRow) {
                maxRow = table.y + table.rows;
            }
        });
        return maxRow;
    };
    return Floorplan;
}());
exports.Floorplan = Floorplan;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvb3JwbGFuLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsic2hhcmVkL3NyYy9jbGFzcy9mbG9vcnBsYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtJQUFBO1FBQ0ksYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixXQUFNLEdBTUEsRUFBRSxDQUFDO0lBdUNiLENBQUM7SUFyQ0csNkJBQVMsR0FBVCxVQUFVLE1BQWdCO1FBQTFCLGlCQVlDO1FBWEcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU07WUFDakIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2IsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsQ0FBQyxFQUFFLENBQUM7Z0JBQ0osQ0FBQyxFQUFFLENBQUM7Z0JBQ0osSUFBSSxFQUFFLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLENBQUM7YUFDVixDQUFDLENBQUM7WUFDSCxDQUFDLEVBQUUsQ0FBQztRQUNSLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGdDQUFZLEdBQVo7UUFDSSxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFFbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO1lBQ3JCLElBQUksS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxHQUFHLFNBQVMsRUFBRTtnQkFDbEMsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQzthQUNwQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELDZCQUFTLEdBQVQ7UUFDSSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFFZixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7WUFDckIsSUFBSSxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsTUFBTSxFQUFFO2dCQUMvQixNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBL0NELElBK0NDO0FBL0NZLDhCQUFTIn0=