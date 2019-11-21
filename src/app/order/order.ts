export class Order {
  table: string;
  items: Map<string, number> = new Map<string, number>();

  constructor(table: string) {
    this.table = table;
    this.items.set('item1', 4);
    this.items.set('item2', 4);
    this.items.set('item3', 4);
  }

  addItem(item: string): void {
    if (this.items.has(item)) {
      this.items.set(item, this.items.get(item) + 1);
    } else {
      this.items.set(item, 1);
    }
  }
}
