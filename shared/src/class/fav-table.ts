export class FavTable {
    user: string;
    tables: string[] = [];

    constructor(user: string, tables: string[] = []) {
        this.user = user;
        this.tables = tables;
    }
}