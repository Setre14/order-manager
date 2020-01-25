import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/service/location.service';
import { TableService } from 'src/app/service/table.service';
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
    public tableService: TableService,
    public floorplanService: FloorplanService,
    private langService: LangService
  ) { }

  async ngOnInit() {
    this.langService.setTitle('Floorplan');

    this.tableService.loadTables();
    this.floorplanService.loadFloorplans();
    this.locationService.loadLocations();
  }

  getLocations(): string[] {
    return this.locationService.getLocations();

  }
}
