import { DBElem } from './dbElem';

export class FavTable extends DBElem {
  user: string;
  tableIds: string[] = [];

  constructor(user: string, tables: string[] = []) {
    super();
    this.user = user;
    this.tableIds = tables;
  }

  static fromJson(obj: FavTable): FavTable {
    const favTable = new FavTable(obj.user, obj.tableIds);
    favTable._id = obj._id;
    favTable.disabled = obj.disabled;

    return favTable;
  }
}
