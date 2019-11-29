import {Item} from './item';
import {OrderComment} from './order-comment';

export class OrderItem {
  item: Item;
  amount: number;
  comments: Map<string, OrderComment> = new Map<string, OrderComment>();

  constructor(item: Item, amount: number = 1) {
    this.item = item;
    this.amount = amount;
  }

  name(): string {
    return this.item.name;
  }

  add(amount): void {
    this.amount += amount;
  }

  remove(): void {
    if (this.amount > 0) {
      this.amount--;
    }
  }

  price(): number {
    return this.item.price;
  }

  total(): number {
    return this.item.price * this.amount;
  }

  addComment(comment, amount) {
    if (this.comments.has(comment)) {
      this.comments.get(comment).incAmount(amount);
    } else {
      this.comments.set(comment, new OrderComment(comment, amount));
    }
  }

  addCommentMap(comments: Map<string, OrderComment>) {
    Array.from(comments.values()).forEach(comment => this.addComment(comment.comment, comment.amount));
  }

  getComments(): OrderComment[] {
    return Array.from(this.comments.values());
  }

  copy(): OrderItem {
    const copy = new OrderItem(this.item, this.amount);
    copy.comments = new Map<string, OrderComment>(this.comments);

    const newComments = new Map<string, OrderComment>();

    this.getComments().forEach(comment =>
      newComments.set(comment.comment, comment.copy())
    );

    copy.comments = newComments;

    return copy;
  }

  isEqual(orderItem: OrderItem): boolean {
    if (orderItem === null) {
      return false;
    }
    return this.item === orderItem.item;
  }

  hasComment() {
    return this.getComments().length > 0;
  }

  isType(type: string): boolean {
    return this.item.isType(type);
  }

  getCommentStringList(): string[] {
    const comment = [];
    this.getComments().forEach(com => comment.push(com.asString()));

    return comment;
  }
}
