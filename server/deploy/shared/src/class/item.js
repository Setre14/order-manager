"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Item = /** @class */ (function () {
    function Item(name, type, price, station) {
        if (station === void 0) { station = undefined; }
        this.name = name;
        this.price = price;
        this.type = type;
        this.station = station;
    }
    Item.prototype.isType = function (type) {
        return this.type === type;
    };
    Item.create = function (item) {
        return new Item(item.name, item.type, item.price, item.station);
    };
    return Item;
}());
exports.Item = Item;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNoYXJlZC9zcmMvY2xhc3MvaXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBO0lBTUUsY0FBWSxJQUFZLEVBQUUsSUFBWSxFQUFFLEtBQWEsRUFBRSxPQUF3QztRQUF4Qyx3QkFBQSxFQUFBLG1CQUF3QztRQUM3RixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBRUQscUJBQU0sR0FBTixVQUFPLElBQVk7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRU0sV0FBTSxHQUFiLFVBQWMsSUFBVTtRQUN0QixPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBQ0gsV0FBQztBQUFELENBQUMsQUFwQkQsSUFvQkM7QUFwQlksb0JBQUkifQ==