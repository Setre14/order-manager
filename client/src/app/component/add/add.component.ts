import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { LangService } from 'src/app/service/lang.service';
import { AddTableRefComponent } from '../add-table-ref/add-table-ref.component';
import { AddItemRefComponent } from '../add-item-ref/add-item-ref.component';
import { UtilService } from 'src/app/service/util.service';
import { AddCommentDialogComponent } from '../add-comment-dialog/add-comment-dialog.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  activeTab: number = 0;

  constructor(
    public langService: LangService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.langService.setTitle('Add');
  }

  tabChanged(tabChangedEvent: MatTabChangeEvent): void {
    this.activeTab = tabChangedEvent.index;
  }

  openAdd(): void {
    let refComponent
    switch(this.activeTab) {
      case 0:
        refComponent = AddTableRefComponent;
        break;
      case 1:
        refComponent = AddItemRefComponent;
        break;
      case 2:
        refComponent = AddCommentDialogComponent;
        break;
      default:
        // code block
    }

    this.utilService.openDialog(refComponent);
  }
}
