import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RestAPI, RestAction, Loc } from '../../../../shared';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root',
})
export class LocService {
  private locations: Map<string, Loc> = new Map<string, Loc>();

  constructor(
    private comService: CommunicationService,
    private tableService: TableService
  ) {}

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
    if (!this.locations.has(loc._id) && !this.hasLocation(loc.name)) {
      location = loc;
      this.locations.set(loc._id, loc);
      this.comService.post(RestAPI.LOCATION, RestAction.INSERT, loc);
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
    return this.locations.get(locId);
  }

  getLocations(): Loc[] {
    return Array.from(this.locations.values()).sort((a: Loc, b: Loc) =>
      a.name.localeCompare(b.name)
    );
  }

  getLocNames(): string[] {
    return this.getLocations()
      .map(loc => loc.name)
      .sort();
  }

  disable(locId: string): void {
    if (this.locations.has(locId)) {
      this.tableService.disableLoc(locId);
      const loc = this.locations.get(locId);
      this.locations.delete(locId);
      this.comService.post(RestAPI.LOCATION, RestAction.DISABLE, loc);
    }
  }

  async disableAll(): Promise<void> {
    await this.tableService.disableAll();
    this.locations = new Map<string, Loc>();
    await this.comService.get(RestAPI.LOCATION, RestAction.DISABLE_ALL)
  }

  async load(): Promise<void> {
    this.comService.get<Loc>(RestAPI.LOCATION, RestAction.ALL).then(res => {
      res.forEach(r => {
        this.locations.set(r._id, Loc.fromJson(r));
      });
    });
  }
}
