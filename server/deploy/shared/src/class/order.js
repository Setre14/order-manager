"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_item_1 = require("./order-item");
var uuid_1 = require("uuid");
var Order = /** @class */ (function () {
    function Order(table) {
        this.items = new Map();
        this.open = true;
        this.uuid = uuid_1.v1();
        this.table = table;
    }
    Order.prototype.isOpen = function () {
        return this.open;
    };
    Order.prototype.setOpen = function () {
        for (var _i = 0, _a = this.getOrderItems(); _i < _a.length; _i++) {
            var orderItem = _a[_i];
            if (orderItem.getAmount() !== 0) {
                this.open = true;
                return;
            }
        }
        this.open = false;
    };
    Order.prototype.addOrder = function (order) {
        var _this = this;
        if (this.table !== order.table) {
            return;
        }
        order.getOrderItems().forEach(function (orderItem) { return _this.addOrderItem(orderItem); });
    };
    Order.prototype.addItem = function (item, amount) {
        if (amount === void 0) { amount = 1; }
        if (this.items.has(item.name)) {
            var orderItem = this.items.get(item.name);
            if (orderItem === undefined) {
                return;
            }
            orderItem.add(amount);
        }
        else {
            this.items.set(item.name, new order_item_1.OrderItem(item));
        }
    };
    Order.prototype.removeItem = function (item) {
        if (this.items.has(item.name)) {
            var orderItem = this.items.get(item.name);
            if (orderItem === undefined) {
                return;
            }
            orderItem.remove();
            if (orderItem.amount <= 0) {
                this.items.delete(item.name);
            }
        }
    };
    Order.prototype.getOrderItems = function () {
        return Array.from(this.items.values());
    };
    Order.prototype.getOrderItem = function (item) {
        if (this.items.has(item.name)) {
            var orderItem = this.items.get(item.name);
            if (orderItem === undefined) {
                return null;
            }
            return orderItem;
        }
        return null;
    };
    Order.prototype.addOrderItem = function (orderItem) {
        if (this.items.has(orderItem.item.name)) {
            var item = this.items.get(orderItem.item.name);
            if (item !== undefined) {
                item.add(orderItem.amount);
                item.addCommentMap(orderItem.comments);
            }
        }
        else {
            this.items.set(orderItem.item.name, orderItem);
        }
    };
    Order.prototype.getOrderItemsByType = function (type) {
        return this.getOrderItems().filter(function (orderItem) { return orderItem.isType(type); });
    };
    Order.prototype.hasItemType = function (type) {
        return this.getOrderItemsByType(type).length > 0;
    };
    Order.prototype.total = function () {
        var total = 0;
        var orderItems = this.getOrderItems();
        orderItems.forEach(function (orderItem) { return total += orderItem.total(); });
        return total;
    };
    Order.prototype.pay = function (item, amount) {
        var orderItem = this.getOrderItem(item);
        if (orderItem !== null) {
            orderItem.pay(amount);
        }
        this.setOpen();
    };
    Order.prototype.toJSON = function () {
        return {
            uuid: this.uuid,
            table: this.table,
            items: Array.from(this.items.values()),
            open: this.open
        };
    };
    Order.toOrder = function (obj) {
        var order = new Order(obj.table);
        order.uuid = obj.uuid;
        order.open = obj.open;
        obj.items.forEach(function (element) {
            order.addOrderItem(order_item_1.OrderItem.toOrderItem(element));
        });
        return order;
    };
    return Order;
}());
exports.Order = Order;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzaGFyZWQvc3JjL2NsYXNzL29yZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMkNBQXVDO0FBQ3ZDLDZCQUFpQztBQUVqQztJQU1FLGVBQ0UsS0FBYTtRQUpmLFVBQUssR0FBMkIsSUFBSSxHQUFHLEVBQXFCLENBQUM7UUFDN0QsU0FBSSxHQUFHLElBQUksQ0FBQztRQUtWLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBSSxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVELHNCQUFNLEdBQU47UUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELHVCQUFPLEdBQVA7UUFDRSxLQUF3QixVQUFvQixFQUFwQixLQUFBLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBcEIsY0FBb0IsRUFBcEIsSUFBb0IsRUFBRTtZQUF6QyxJQUFNLFNBQVMsU0FBQTtZQUNsQixJQUFJLFNBQVMsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixPQUFNO2FBQ1A7U0FDRjtRQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRCx3QkFBUSxHQUFSLFVBQVMsS0FBWTtRQUFyQixpQkFNQztRQUxDLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQzlCLE9BQU87U0FDUjtRQUVELEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBQSxTQUFTLElBQUksT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUE1QixDQUE0QixDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELHVCQUFPLEdBQVAsVUFBUSxJQUFVLEVBQUUsTUFBVTtR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