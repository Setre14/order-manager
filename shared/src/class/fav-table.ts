import { DBElem } from './dbElem';

export class FavTable extends DBElem {
  user: string;
  tables: string[] = [];

  constructor(user: string, tables: string[] = []) {
    super();
    this.user = user;
    this.tables = tables;
  }

  static fromJson(obj: FavTable): FavTable {
    const favTable = new FavTable(obj.user, obj.tables);
    favTable._id = obj._id;
    favTable.disabled = obj.disabled;

    return favTable;
  }
}
