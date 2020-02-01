export class OrderComment {
  private comment: string;
  private amount: number;

  constructor(comment: string, amount = 1) {
    this.comment = comment;
    this.amount = amount;
  }

  getComment(): string {
    return this.comment;
  }

  getAmount(): number {
    return this.amount;
  }

  incAmount(amount: number = 1): void {
    this.amount += amount;
  }

  decAmount(amount: number = 1): void {
    this.amount -= amount;
  }

  copy(): OrderComment {
    return new OrderComment(this.comment, this.amount);
  }

  asString(): string {
    return this.amount + 'x ' + this.comment;
  }
}
