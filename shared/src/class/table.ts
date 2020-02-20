import { DBElem } from './dbElem';

export class Table extends DBElem {
  name: string;
  location: string;

  constructor(name: string, location: string) {
    super();
    this.name = name;
    this.location = location;
  }

  static fromJson(obj: Table): Table {
    const table = new Table(obj.name, obj.location);
    table._id = obj._id;
    table.disabled = obj.disabled;

    return table;
  }
}
