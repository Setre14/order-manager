import { OrderComment } from './order-comment';
import { DBElem } from './dbElem';

export class OrderItem extends DBElem {
  item: string;
  amount: number;
  amountpayed: number;
  comments: Map<string, OrderComment> = new Map<string, OrderComment>();

  constructor(item: string, amount: number = 1, amountpayed: number = 0) {
    super();
    this.item = item;
    this.amount = amount;
    this.amountpayed = amountpayed;
  }

  add(amount: number): void {
    this.amount += amount;
  }

  remove(): void {
    if (this.amount > 0) {
      this.amount--;
    }
  }

  getTotalAmount(): number {
    return this.amount;
  }

  getOpenAmount(): number {
    return this.amount - this.amountpayed;
  }

  isPayed(): boolean {
    return this.getOpenAmount() == 0;
  }

  pay(amount: number): void {
    if (this.getOpenAmount() < amount) {
      amount = this.getOpenAmount();
    }
    this.amountpayed += amount;
  }

  addComment(commentId: string, amount: number): void {
    if (this.comments.has(commentId)) {
      const comment = this.comments.get(commentId);

      if (comment === undefined) {
        return;
      }

      comment.incAmount(amount);
    } else {
      this.comments.set(commentId, new OrderComment(commentId, amount));
    }
  }

  addCommentMap(comments: Map<string, OrderComment>) {
    Array.from(comments.values()).forEach(comment =>
      this.addComment(comment.commentId, comment.amount)
    );
  }

  getComments(): OrderComment[] {
    return Array.from(this.comments.values());
  }

  isEqual(orderItem: OrderItem): boolean {
    if (orderItem === null) {
      return false;
    }
    return this.item === orderItem.item;
  }

  hasComments() {
    return this.getComments().length > 0;
  }

  toJSON() {
    return {
      _id: this._id,
      disabled: this.disabled,
      item: this.item,
      amount: this.amount,
      amountpayed: this.amountpayed,
      comments: Array.from(this.comments.values()),
    };
  }

  static fromJson(obj: OrderItem): OrderItem {
    const orderItem = new OrderItem(obj.item, obj.amount, obj.amountpayed);
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
