import { OrderComment } from './order-comment';
import { DBElem } from './dbElem';

export class OrderItem extends DBElem {
  itemId: string;
  amount: number;
  comments: Map<string, OrderComment> = new Map<string, OrderComment>();

  constructor(itemId: string, amount: number = 1, amountpayed: number = 0) {
    super();
    this.itemId = itemId;
    this.amount = amount;
  }

  add(amount: number): void {
    this.amount += amount;
  }

  remove(amount: number = 1): void {
    if (this.amount > 0) {
      this.amount -= amount;
    }
  }

  addComment(com: string, amount: number): void {
    if (this.comments.has(com)) {
      const comment = this.comments.get(com);

      if (comment === undefined) {
        return;
      }

      comment.incAmount(amount);
    } else {
      this.comments.set(com, new OrderComment(com, amount));
    }
  }

  addCommentMap(comments: Map<string, OrderComment>) {
    Array.from(comments.values()).forEach(comment =>
      this.addComment(comment.comment, comment.amount)
    );
  }

  getComments(): OrderComment[] {
    return Array.from(this.comments.values());
  }

  isEqual(orderItem: OrderItem): boolean {
    if (orderItem === null) {
      return false;
    }
    return this.itemId === orderItem.itemId;
  }

  hasComments() {
    return this.getComments().length > 0;
  }

  toJSON() {
    return {
      _id: this._id,
      disabled: this.disabled,
      itemId: this.itemId,
      amount: this.amount,
      comments: Array.from(this.comments.values()),
    };
  }

  static fromJson(obj: OrderItem): OrderItem {
    const orderItem = new OrderItem(obj.itemId, obj.amount);
    orderItem._id = obj._id;
    orderItem.disabled = obj.disabled;
    if (Array.isArray(obj.comments)) {
      obj.comments.forEach((element: any) => {
        orderItem.addComment(element.commentId, element.amount);
      });
    }

    return orderItem;
  }
}
