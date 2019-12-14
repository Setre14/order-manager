import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TableOverviewService } from 'src/app/service/table-overview.service';

@Component({
  selector: 'app-location-plan',
  templateUrl: './location-plan.component.html',
  styleUrls: ['./location-plan.component.scss']
})
export class LocationPlanComponent implements OnInit {
  row: number = 0;
  column: number = 0;

  tablePlan: string[][] = [];

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];


  constructor(
    public tableOverviewService: TableOverviewService
  ) { }

  ngOnInit() {
    this.tableOverviewService.loadTables();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // if (Math.abs(event.previousIndex - event.currentIndex) !== 1) {
      //   moveItemInArray(event.container.data, event.currentIndex-1, event.previousIndex);
      // }
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  addRow() {
    this.tablePlan.push([])
  }

  addEmptyElem() {
    this.tablePlan[this.tablePlan.length-1].push('');
  }

  getRows() {
    return this.tablePlan;
  }

  getColumns() {
    return Array(this.column).fill(5);
  }

  initPlan() {
    if (this.column > 0) {
      // this.tableOverviewService.getTableNames
    } else {
      this.tablePlan[0] = this.tableOverviewService.getTableNames();
    }
  }

}
