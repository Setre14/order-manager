import { Component, OnInit, Type } from '@angular/core';
import { LocService } from 'src/app/services/loc.service';
import { Loc } from '../../../../../shared';


@Component({
  selector: 'app-floorplan',
  templateUrl: './floorplan.component.html',
  styleUrls: ['./floorplan.component.scss'],
})
export class FloorplanComponent implements OnInit {
  activeTab: string;

  constructor(
    private locService: LocService
  ) { }

  ngOnInit() {
    this.locService.load();
  }

  getLocations(): Loc[] {
    const locs = this.locService.getLocations();

    if (locs.length >= 1 && !this.activeTab) {
      this.activeTab = locs[0]._id;
    }

    return locs;
  }

  isTabChecked(tab: Loc): boolean {
    return tab._id == this.activeTab;
  }

  segmentChanged(event: any): void {
    this.activeTab = event.detail.value;
  }

}
