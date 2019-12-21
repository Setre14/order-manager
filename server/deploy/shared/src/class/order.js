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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzaGFyZWQvc3JjL2NsYXNzL29yZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMkNBQXVDO0FBQ3ZDLDZCQUFpQztBQUVqQztJQU1FLGVBQ0UsS0FBYTtRQUpmLFVBQUssR0FBMkIsSUFBSSxHQUFHLEVBQXFCLENBQUM7UUFDN0QsU0FBSSxHQUFHLElBQUksQ0FBQztRQUtWLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBSSxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVELHdCQUFRLEdBQVIsVUFBUyxLQUFZO1FBQXJCLGlCQU1DO1FBTEMsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDOUIsT0FBTztTQUNSO1FBRUQsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQTVCLENBQTRCLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsdUJBQU8sR0FBUCxVQUFRLElBQVUsRUFBRSxNQUFVO1FBQVYsdUJBQUEsRUFBQSxVQUFVO1FBQzVCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzdCLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUU1QyxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7Z0JBQzNCLE9BQU87YUFDUjtZQUVELFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkI7YUFBTTtZQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxz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