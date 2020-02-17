import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { LocService } from 'src/app/services/loc.service';
import { ItemService } from 'src/app/services/item.service';
import { CommentService } from 'src/app/services/comment.service';
import { TypeService } from 'src/app/services/type.service';

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

  activeTab: string;

  constructor(
    private typeService: TypeService,
    private commentService: CommentService,
    private itemService: ItemService,
    private locService: LocService,
    private tableService: TableService,
  ) { }

  ngOnInit() {
    this.locService.load();
    this.tableService.load();
    this.typeService.load();
    this.itemService.load();
    this.commentService.load();
  }

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
