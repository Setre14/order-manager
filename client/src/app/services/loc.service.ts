import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RestAPI, RestAction, Loc } from '../../../../shared';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root'
})
export class LocService {
  private locations: Map<string, Loc> = new Map<string, Loc>()

  constructor(
    private comService: CommunicationService,
    private tableService: TableService
  ) { }

  addLocation(loc: Loc) {
    if (!this.locations.has(loc._id)) {
      this.locations.set(loc._id, loc);
      this.comService.post(RestAPI.LOCATION, RestAction.INSERT, loc);
    }
  }

  getLocation(locId: string): Loc {
    return this.locations.get(locId);
  }

  getLocations(): Loc[] {
    return Array.from(this.locations.values());
  }

  getLocNames(): string[] {
    return this.getLocations().map(loc => loc.name);
  }

  deleteLocation(locId: string): void {
    if (this.locations.has(locId)) {
      this.tableService.deleteLoc(locId);
      const loc = this.locations.get(locId);
      this.locations.delete(locId);
      this.comService.post(RestAPI.LOCATION, RestAction.DELETE, loc);
    }
  }

  async load(): Promise<void> {
    this.comService.get<Loc>(RestAPI.LOCATION, RestAction.ALL).then(res => {
      res.forEach(r => {
        this.locations.set(r._id, Loc.fromJson(r));
      });
    });
  }
}