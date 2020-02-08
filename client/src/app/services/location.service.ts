import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RestAPI, RestAction } from '../../../../shared';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locations: string[] = [];

  constructor(
    private comService: CommunicationService,
    private tableService: TableService
  ) { }

  addLocation(loc: string) {
    if (!this.locations.includes(loc)) {
      this.locations.push(loc);
      this.comService.post(RestAPI.LOCATION, RestAction.INSERT, { location: loc });
    }
  }

  getLocations(): string[] {
    return this.locations.sort();
  }

  deleteLocation(loc: string): void {
    if (this.locations.includes(loc)) {
      this.tableService.deleteLoc(loc);
      this.locations = this.locations.filter(location => location !== loc);
      this.comService.post(RestAPI.LOCATION, RestAction.DELETE, { location: loc });
    }
  }

  async loadLocations(): Promise<void> {
    this.comService.get<string>(RestAPI.LOCATION, RestAction.ALL).then(res => this.locations = res);
  }
}
