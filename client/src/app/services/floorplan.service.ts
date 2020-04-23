import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RestAPI, Floorplan } from '../../../../shared';
import { TableService } from './table.service';
import { StorableService } from './storable.service';

@Injectable({
  providedIn: 'root',
})
export class FloorplanService extends StorableService<Floorplan> {
  restAPI = RestAPI.FLOORPLAN;
  conversion = Floorplan.fromJson;

  elements: Map<string, Floorplan> = new Map<string, Floorplan>();

  constructor(
    protected comService: CommunicationService,
    public tableService: TableService
  ) {
    super(comService);
    this.tableService.load();
  }

  getFloorplan(location: string): Floorplan {
    const res = Array.from(this.elements.values()).filter(
      f => f.location === location
    );

    if (res.length >= 1) {
      return res[0];
    } else {
      const floorplan = new Floorplan();
      floorplan.location = location;
      floorplan.addTables(
        this.tableService.getLocTables(location).map(table => table._id)
      );
      this.elements.set(floorplan._id, floorplan);
      return floorplan;
    }
  }

  save(f: Floorplan) {
    const id = f._id;
    const tables = f.tables;

    const floorplan = this.elements.get(id);
    floorplan.tables = tables;

    this.dbUpdate(floorplan);
  }
}
