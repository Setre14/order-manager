import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { LocService } from 'src/app/services/loc.service';
import { ItemService } from 'src/app/services/item.service';
import { CommentService } from 'src/app/services/comment.service';
import { TypeService } from 'src/app/services/type.service';
import { ManageAddUserComponent } from './add/add-user/add-user.component';
import { ModalController } from '@ionic/angular';
import { ManageAddTableComponent } from './add/add-table/add-table.component';
import { ManageAddItemComponent } from './add/add-item/add-item.component';
import { ManageAddCommentComponent } from './add/add-comment/add-comment.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['../../style.scss'],
})
export class ManageComponent implements OnInit {
  private TABS = ['Tisch', 'Item', 'Kommentar', 'User'];

  activeTab: string;

  constructor(
    private modalCtrl: ModalController,
    private typeService: TypeService,
    private commentService: CommentService,
    private itemService: ItemService,
    private locService: LocService,
    private tableService: TableService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.locService.load();
    this.tableService.load();
    this.typeService.load();
    this.itemService.load();
    this.commentService.load();
    this.userService.load();
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

  async add(): Promise<void> {
    let cmp: any = ManageAddTableComponent;

    if (this.activeTab == 'Item') {
      cmp = ManageAddItemComponent;
    }
    if (this.activeTab == 'Kommentar') {
      cmp = ManageAddCommentComponent;
    }
    if (this.activeTab == 'User') {
      cmp = ManageAddUserComponent;
    }

    const modal = await this.modalCtrl.create({
      component: cmp,
    });
    await modal.present();
  }
}
