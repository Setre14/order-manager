import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent, MatDialog } from '@angular/material';
import { LangService } from 'src/app/service/lang.service';
import { AddTableRefComponent } from '../add-table-ref/add-table-ref.component';
import { AddItemRefComponent } from '../add-item-ref/add-item-ref.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  activeTab: number = 0;

  constructor(
    public langService: LangService,
    private matDialog: MatDialog
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
        refComponent = AddTableRefComponent
        break;
      case 1:
        refComponent = AddItemRefComponent
        break;
      default:
        // code block
    }

    this.matDialog.open(refComponent, {
      width: '95%'
    });
  }
}
