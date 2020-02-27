import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RestAPI, RestAction, Floorplan } from '../../../../shared';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root',
})
export class FloorplanService {
  floorplan: Map<string, Floorplan> = new Map<string, Floorplan>();

  constructor(
    public comService: CommunicationService,
    public tableService: TableService
  ) {
    this.tableService.load();
  }

  async loadFloorplans() {
    const res = await this.comService.get<Floorplan>(
      RestAPI.FLOORPLAN,
      RestAction.ALL
    );

    this.floorplan = new Map<string, Floorplan>();
    res.forEach(floorplan => {
      const f: Floorplan = Floorplan.fromJson(floorplan);

      this.floorplan.set(f.location, f);
    });
  }

  getFloorplan(location: string): Floorplan {
    if (this.floorplan.has(location)) {
      return this.floorplan.get(location);
    } else {
      const floorplan = new Floorplan();
      floorplan.location = location;
      floorplan.addTables(this.tableService.getLocTables(location).map(table => table._id));
      this.floorplan.set(location, floorplan);
      return floorplan;
    }
  }

  save(floorplan: Floorplan) {
    const location = floorplan.location;
    const tables = floorplan.tables;

    this.floorplan.get(location).tables = tables;
    this.comService.post(
      RestAPI.FLOORPLAN,
      RestAction.INSERT_OR_UPDATE,
      this.floorplan.get(location)
    );
  }
}
