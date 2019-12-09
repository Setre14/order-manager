"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var item_1 = require("./item");
var order_comment_1 = require("./order-comment");
var OrderItem = /** @class */ (function () {
    function OrderItem(item, amount) {
        if (amount === void 0) { amount = 1; }
        this.comments = new Map();
        this.item = item;
        this.amount = amount;
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
        var copy = new OrderItem(this.item, this.amount);
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
    OrderItem.prototype.hasComment = function () {
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
            comments: Array.from(this.comments.values())
        };
    };
    OrderItem.toOrderItem = function (obj) {
        var orderItem = new OrderItem(item_1.Item.create(obj.item), obj.amount);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNoYXJlZC9zcmMvY2xhc3Mvb3JkZXItaXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUE0QjtBQUM1QixpREFBNkM7QUFFN0M7SUFLRSxtQkFBWSxJQUFVLEVBQUUsTUFBa0I7UUFBbEIsdUJBQUEsRUFBQSxVQUFrQjtRQUYxQyxhQUFRLEdBQThCLElBQUksR0FBRyxFQUF3QixDQUFDO1FBR3BFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCx3QkFBSSxHQUFKO1FBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRUQsdUJBQUcsR0FBSCxVQUFJLE1BQWM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUM7SUFDeEIsQ0FBQztJQUVELDBCQUFNLEdBQU47UUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmO0lBQ0gsQ0FBQztJQUVELHlCQUFLLEdBQUw7UUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCx5QkFBSyxHQUFMO1FBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCw4QkFBVSxHQUFWLFVBQVcsR0FBVyxFQUFFLE1BQWM7UUFDcEMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMxQixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUV0QyxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7Z0JBQ3pCLE9BQU87YUFDUjtZQUVELE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDM0I7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLDRCQUFZLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDdkQ7SUFDSCxDQUFDO0lBRUQsaUNBQWEsR0FBYixVQUFjLFFBQW1DO1FBQWpELGlCQUVDO1FBREMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFoRCxDQUFnRCxDQUFDLENBQUM7SUFDckcsQ0FBQztJQUVELCtCQUFXLEdBQVg7UUFDRSxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCx3QkFBSSxHQUFKO1FBQ0UsSUFBTSxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsQ0FBdUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTdELElBQU0sV0FBVyxHQUFHLElBQUksR0FBRyxFQUF3QixDQUFDO1FBRXBELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO1lBQ2hDLE9BQUEsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUFoRCxDQUFnRCxDQUNqRCxDQUFDO1FBRUYsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7UUFFNUIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsMkJBQU8sR0FBUCxVQUFRLFNBQW9CO1FBQzFCLElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtZQUN0QixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUM7SUFDdEMsQ0FBQztJQUVELDhCQUFVLEdBQVY7UUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCwwQkFBTSxHQUFOLFVBQU8sSUFBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCx3Q0FBb0IsR0FBcEI7UUFDRSxJQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQTVCLENBQTRCLENBQUMsQ0FBQztRQUVoRSxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQsMEJBQU0sR0FBTjtRQUNFLE9BQU87WUFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsUUFBUSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUM3QyxDQUFBO0lBQ0gsQ0FBQztJQUVNLHFCQUFXLEdBQWxCLFVBQW1CLEdBQWM7UUFDL0IsSUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsV0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25FLElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDOUIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO2dCQUMxQixTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hELENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBN0dELElBNkdDO0FBN0dZLDhCQUFTIn0=