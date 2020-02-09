import { DBElem } from './dbElem';

export class OrderComment extends DBElem {
  comment: string;
  amount: number;

  constructor(comment: string, amount = 1) {
    super()
    this.comment = comment;
    this.amount = amount;
  }

  incAmount(amount: number = 1): void {
    this.amount += amount;
  }

  decAmount(amount: number = 1): void {
    this.amount -= amount;
  }

  
  asString(): string {
    return this.amount + 'x ' + this.comment;
  }

  static fromJson(obj: OrderComment): OrderComment {
    const comment = new OrderComment(obj.comment, obj.amount);
    comment._id = obj._id;

    return comment;
  }
}
