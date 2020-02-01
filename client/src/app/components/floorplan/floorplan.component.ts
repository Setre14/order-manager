import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-floorplan',
  templateUrl: './floorplan.component.html',
  styleUrls: ['./floorplan.component.scss'],
})
export class FloorplanComponent implements OnInit {
  activeTab: string;

  constructor(
    private locService: LocationService
  ) { }

  ngOnInit() {
    this.locService.loadLocations();
  }

  getLocations(): string[] {
    const locs = this.locService.getLocations();
    
    if (locs.length >= 1 && !this.activeTab) {
      this.activeTab = locs[0];
    }

    return locs;
  }

  isTabChecked(tab: string): boolean {
    return tab == this.activeTab;
  }

  segmentChanged(event: any): void {
    this.activeTab = event.detail.value;
  }

}
