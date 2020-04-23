import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RestAPI, RestAction, Loc } from '../../../../shared';
import { TableService } from './table.service';
import { StorableService } from './storable.service';

@Injectable({
  providedIn: 'root',
})
export class LocService extends StorableService<Loc> {
  restAPI = RestAPI.LOCATION;
  conversion = Loc.fromJson;

  elements: Map<string, Loc> = new Map<string, Loc>();

  constructor(
    protected comService: CommunicationService,
    private tableService: TableService
  ) {
    super(comService);
  }

  hasLocation(loc: string): boolean {
    let exists = false;

    this.getLocations().forEach(location => {
      if (location.name == loc) {
        exists = true;
        return;
      }
    });

    return exists;
  }

  addLocation(loc: Loc): Loc {
    let location: Loc;
    if (!this.elements.has(loc._id) && !this.hasLocation(loc.name)) {
      location = loc;
      this.elements.set(loc._id, loc);
      this.dbInsert(loc);
    } else {
      this.getLocations().forEach(locs => {
        if (locs.name == loc.name) {
          location = locs;
        }
      });
    }

    return location;
  }

  getLocation(locId: string): Loc {
    return this.elements.get(locId);
  }

  getLocations(): Loc[] {
    return Array.from(this.elements.values()).sort((a: Loc, b: Loc) =>
      a.name.localeCompare(b.name)
    );
  }

  getLocNames(): string[] {
    return this.getLocations()
      .map(loc => loc.name)
      .sort();
  }

  disable(locId: string): void {
    if (this.elements.has(locId)) {
      this.tableService.disableLoc(locId);
      const loc = this.elements.get(locId);
      this.elements.delete(locId);
      this.dbDisable(loc);
    }
  }

  async disableAll(): Promise<void> {
    await this.tableService.disableAll();
    this.elements = new Map<string, Loc>();
    await this.dbDdisableAll();
  }
}
