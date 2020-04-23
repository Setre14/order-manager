import { DBElem } from './dbElem';

export class Token extends DBElem {
  token: string = '';
  userId: string = '';
  expireDate: Date = new Date();

  constructor(token: string) {
    super();
    this.token = token;
  }

  static fromJson(obj: Token): Token {
    const token = new Token(obj.token);
    token._id = obj._id;
    token.disabled = obj.disabled;
    token.userId = obj.userId;
    token.expireDate = obj.expireDate;

    return token;
  }
}
