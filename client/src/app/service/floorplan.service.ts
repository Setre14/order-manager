import { Injectable, OnInit } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RestAPI, RestAction, Floorplan } from '../../../../shared';
import { TableOverviewService } from './table-overview.service';

@Injectable({
  providedIn: 'root'
})
export class FloorplanService implements OnInit {
  floorplan: Map<string, Floorplan> = new Map<string, Floorplan>();

  constructor(
    public comService: CommunicationService,
    public tableOverviewService: TableOverviewService
  ) { }

  ngOnInit() {
    this.tableOverviewService.loadTables();
  }

  async loadFloorplans() {
    const res = await this.comService.get<Floorplan>(RestAPI.FLOORPLAN, RestAction.ALL);

    this.floorplan = new Map<string, Floorplan>();
    res.forEach(floorplan => {
      const f: Floorplan = new Floorplan();
      f.location = floorplan.location;
      f.tables = floorplan.tables;

      this.floorplan.set(f.location, f);
    });
  }

  getFloorplan(location: string): Floorplan {
    if (this.floorplan.has(location)) {
      return this.floorplan.get(location);
    } else {
      const floorplan = new Floorplan();
      floorplan.location = location;
      floorplan.addTables(this.tableOverviewService.getLocationTableNames(location));
      this.floorplan.set(location, floorplan);
      return floorplan;
    }
  }

  save(floorplan: Floorplan) {
    const location = floorplan.location;
    const tables = floorplan.tables;

    this.floorplan.get(location).tables = tables;
    this.comService.post(RestAPI.FLOORPLAN, RestAction.UPDATE, this.floorplan.get(location));
  }
}
