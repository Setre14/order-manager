import { DBElem } from './dbElem';

export class Loc extends DBElem {
  name: string;

  constructor(loc: string) {
    super();
    this.name = loc;
  }

  static fromJson(obj: Loc): Loc {
    const location = new Loc(obj.name);
    location._id = obj._id;
    location.disabled = obj.disabled;

    return location;
  }
}
