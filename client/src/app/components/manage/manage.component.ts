import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  private TABS = [
    'Table',
    'Item',
    'Comment'
  ]

  private activeTab: string;

  constructor() { }

  ngOnInit() {}

  getTabs(): string[] {
    if (!this.activeTab) {
      this.activeTab = this.TABS[0];
    }

    return this.TABS;
  }

  segmentChanged(event: any): void {
    this.activeTab = event.detail.value;
  }

  isTabChecked(tab: string): boolean {
    return tab == this.activeTab;
  }

}
