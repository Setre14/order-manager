import { DBElem } from './dbElem';

export class OrderComment extends DBElem {
  commentId: string;
  amount: number;

  constructor(commentId: string, amount = 1) {
    super()
    this.commentId = commentId;
    this.amount = amount;
  }

  incAmount(amount: number = 1): void {
    this.amount += amount;
  }

  decAmount(amount: number = 1): void {
    this.amount -= amount;
  }

  
  // asString(): string {
  //   return this.amount + 'x ' + this.comment;
  // }

  static fromJson(obj: OrderComment): OrderComment {
    const comment = new OrderComment(obj.commentId, obj.amount);
    comment._id = obj._id;
    comment.disabled = obj.disabled;

    return comment;
  }
}
