import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RestAPI, RestAction } from '../../../../shared/src';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locations: string[] = [];

  constructor(
    public comService: CommunicationService
  ) { }

  addLocation(loc: string) {
    if (!this.locations.includes(loc)) {
      this.locations.push(loc);
      this.comService.post(RestAPI.LOCATION, RestAction.INSERT, { location: loc });
    }
  }

  getLocations(): string[] {
    return this.locations;
  }

  deleteLocation(loc: string): void {
    if (this.locations.includes(loc)) {
      this.locations = this.locations.filter(location => location !== loc);
      this.comService.post(RestAPI.LOCATION, RestAction.DELETE, { location: loc });
    }
  }

  loadLocations() {
    this.comService.get<string>(RestAPI.LOCATION, RestAction.ALL).then(res => this.locations = res);
  }
}