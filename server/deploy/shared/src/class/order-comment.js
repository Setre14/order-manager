"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrderComment = /** @class */ (function () {
    function OrderComment(comment, amount) {
        if (amount === void 0) { amount = 1; }
        this.comment = comment;
        this.amount = amount;
    }
    OrderComment.prototype.incAmount = function (amount) {
        this.amount += amount;
    };
    OrderComment.prototype.copy = function () {
        return new OrderComment(this.comment, this.amount);
    };
    OrderComment.prototype.asString = function () {
        return this.amount + 'x ' + this.comment;
    };
    return OrderComment;
}());
exports.OrderComment = OrderComment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItY29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNoYXJlZC9zcmMvY2xhc3Mvb3JkZXItY29tbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0lBSUUsc0JBQVksT0FBZSxFQUFFLE1BQVU7UUFBVix1QkFBQSxFQUFBLFVBQVU7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELGdDQUFTLEdBQVQsVUFBVSxNQUFXO1FBQ25CLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDO0lBQ3hCLENBQUM7SUFFRCwyQkFBSSxHQUFKO1FBQ0UsT0FBTyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsK0JBQVEsR0FBUjtRQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUMzQyxDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDO0FBcEJZLG9DQUFZIn0=