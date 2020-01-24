import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  private title = 'Order Manager';

  constructor() { }

  getTitle() {
    return this.title;
  }

  setTitle(title: string) {
    this.title = title
  }

  setTableTitle(tableName: string, appendix: string = '') {
    let title = 'Table ' + tableName;

    if (appendix) {
      title += ': ' + appendix;
    }

    this.setTitle(title);
  }
}
