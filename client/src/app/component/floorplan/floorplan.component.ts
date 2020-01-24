import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/service/location.service';
import { TableOverviewService } from 'src/app/service/table-overview.service';
import { FloorplanService } from 'src/app/service/floorplan.service';
import { LangService } from 'src/app/service/lang.service';

@Component({
  selector: 'app-floorplan',
  templateUrl: './floorplan.component.html',
  styleUrls: ['./floorplan.component.scss']
})
export class FloorplanComponent implements OnInit {
  constructor(
    public locationService: LocationService,
    public tableOverviewService: TableOverviewService,
    public floorplanService: FloorplanService,
    private langService: LangService
  ) { }

  async ngOnInit() {
    this.langService.setTitle('Floorplan');

    this.tableOverviewService.loadTables();
    this.floorplanService.loadFloorplans();
    this.locationService.loadLocations();
  }

  getLocations(): string[] {
    return this.locationService.getLocations();

  }
}
