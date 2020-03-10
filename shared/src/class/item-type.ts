import { DBElem } from './dbElem';

export class ItemType extends DBElem {
  name: string;

  constructor(type: string) {
    super();
    this.name = type;
  }

  static fromJson(obj: ItemType): ItemType {
    const type = new ItemType(obj.name);
    type._id = obj._id;
    type.disabled = obj.disabled;

    return type;
  }
}
