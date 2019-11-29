export class OrderComment {
  comment: string;
  amount: number;

  constructor(comment: string, amount = 1) {
    this.comment = comment;
    this.amount = amount;
  }

  incAmount(amount: any) {
    this.amount += amount;
  }

  copy(): OrderComment {
    return new OrderComment(this.comment, this.amount);
  }

  asString() {
    return this.amount + 'x ' + this.comment;
  }
}
