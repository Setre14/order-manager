import { DBElem } from './dbElem';

export class Table extends DBElem {
  name: string;
  locId: string;

  constructor(name: string, locId: string) {
    super();
    this.name = name;
    this.locId = locId;
  }

  static fromJson(obj: Table): Table {
    const table = new Table(obj.name, obj.locId);
    table._id = obj._id;
    table.disabled = obj.disabled;

    return table;
  }
}
