"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var item_1 = require("./item");
var order_comment_1 = require("./order-comment");
var OrderItem = /** @class */ (function () {
    function OrderItem(item, amount, amountpayed) {
        if (amount === void 0) { amount = 1; }
        if (amountpayed === void 0) { amountpayed = 0; }
        this.comments = new Map();
        this.item = item;
        this.amount = amount;
        this.amountpayed = amountpayed;
    }
    OrderItem.prototype.name = function () {
        return this.item.name;
    };
    OrderItem.prototype.add = function (amount) {
        this.amount += amount;
    };
    OrderItem.prototype.remove = function () {
        if (this.amount > 0) {
            this.amount--;
        }
    };
    OrderItem.prototype.getamount = function () {
        return this.amount - this.amountpayed;
    };
    OrderItem.prototype.pay = function (amount) {
        if (amount + this.amountpayed > this.amount)
            throw "Not so many open articles";
        this.amountpayed += amount;
    };
    OrderItem.prototype.price = function () {
        return this.item.price;
    };
    OrderItem.prototype.total = function () {
        return this.item.price * this.amount;
    };
    OrderItem.prototype.addComment = function (com, amount) {
        if (this.comments.has(com)) {
            var comment = this.comments.get(com);
            if (comment === undefined) {
                return;
            }
            comment.incAmount(amount);
        }
        else {
            this.comments.set(com, new order_comment_1.OrderComment(com, amount));
        }
    };
    OrderItem.prototype.addCommentMap = function (comments) {
        var _this = this;
        Array.from(comments.values()).forEach(function (comment) { return _this.addComment(comment.comment, comment.amount); });
    };
    OrderItem.prototype.getComments = function () {
        return Array.from(this.comments.values());
    };
    OrderItem.prototype.copy = function () {
        var copy = new OrderItem(this.item, this.amount, this.amountpayed);
        copy.comments = new Map(this.comments);
        var newComments = new Map();
        this.getComments().forEach(function (comment) {
            return newComments.set(comment.comment, comment.copy());
        });
        copy.comments = newComments;
        return copy;
    };
    OrderItem.prototype.isEqual = function (orderItem) {
        if (orderItem === null) {
            return false;
        }
        return this.item === orderItem.item;
    };
    OrderItem.prototype.hasComments = function () {
        return this.getComments().length > 0;
    };
    OrderItem.prototype.isType = function (type) {
        return this.item.isType(type);
    };
    OrderItem.prototype.getCommentStringList = function () {
        var comment = [];
        this.getComments().forEach(function (com) { return comment.push(com.asString()); });
        return comment;
    };
    OrderItem.prototype.toJSON = function () {
        return {
            item: this.item,
            amount: this.amount,
            amountpayed: this.amountpayed,
            comments: Array.from(this.comments.values())
        };
    };
    OrderItem.toOrderItem = function (obj) {
        var orderItem = new OrderItem(item_1.Item.create(obj.item), obj.amount, obj.amountpayed);
        if (Array.isArray(obj.comments)) {
            obj.comments.forEach(function (element) {
                orderItem.addComment(element.comment, element.amount);
            });
        }
        return orderItem;
    };
    return OrderItem;
}());
exports.OrderItem = OrderItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNoYXJlZC9zcmMvY2xhc3Mvb3JkZXItaXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUE0QjtBQUM1QixpREFBNkM7QUFFN0M7SUFNRSxtQkFBWSxJQUFVLEVBQUUsTUFBa0IsRUFBRSxXQUF1QjtRQUEzQyx1QkFBQSxFQUFBLFVBQWtCO1FBQUUsNEJBQUEsRUFBQSxlQUF1QjtRQUZuRSxhQUFRLEdBQThCLElBQUksR0FBRyxFQUF3QixDQUFDO1FBR3BFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ2pDLENBQUM7SUFFRCx3QkFBSSxHQUFKO1FBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRUQsdUJBQUcsR0FBSCxVQUFJLE1BQWM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUM7SUFDeEIsQ0FBQztJQUVELDBCQUFNLEdBQU47UUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmO0lBQ0gsQ0FBQztJQUVELDZCQUFTLEdBQVQ7UUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN0QyxDQUFDO0lBRUQsdUJBQUcsR0FBSCxVQUFJLE1BQWM7UUFDaEIsSUFBRyxNQUFNLEdBQUMsSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsTUFBTTtZQUFFLE1BQU0sMkJBQTJCLENBQUM7UUFDMUUsSUFBSSxDQUFDLFdBQVcsSUFBRSxNQUFNLENBQUM7SUFDM0IsQ0FBQztJQUVELHlCQUFLLEdBQUw7UUFDRSxPQUFPLElBQUks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