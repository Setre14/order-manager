"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_item_1 = require("./order-item");
var v1_1 = __importDefault(require("uuid/v1"));
var Order = /** @class */ (function () {
    function Order(table) {
        this.items = new Map();
        this.open = true;
        this.uuid = v1_1.default();
        this.table = table;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzaGFyZWQvc3JjL2NsYXNzL29yZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsMkNBQXVDO0FBQ3ZDLCtDQUEyQjtBQUUzQjtJQU1FLGVBQ0UsS0FBYTtRQUpmLFVBQUssR0FBMkIsSUFBSSxHQUFHLEVBQXFCLENBQUM7UUFDN0QsU0FBSSxHQUFHLElBQUksQ0FBQztRQUtWLElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBSSxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVELHVCQUFPLEdBQVAsVUFBUSxJQUFVLEVBQUUsTUFBVTtRQUFWLHVCQUFBLEVBQUEsVUFBVTtRQUM1QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM3QixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFNUMsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO2dCQUMzQixPQUFPO2FBQ1I7WUFFRCxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3ZCO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksc0JBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQztJQUVELDBCQUFVLEdBQVYsVUFBVyxJQUFVO1FBQ25CLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzdCLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUU1QyxJQUFJ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