import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RestAPI, DBElem } from '../../../../shared';

@Injectable({
  providedIn: 'root'
})
export abstract class StorableService<T extends DBElem> {
  abstract restAPI: RestAPI;
  abstract conversion: (elem: DBElem) => T;

  abstract elements: Map<string, T>

  constructor(
    protected comService: CommunicationService
  ) { }

  async load() {
    this.elements = await this.comService.getAll<T>(this.restAPI, this.conversion);
  }

  async dbGetFiltered(filter: object): Promise<Map<string, T>> {
    return this.comService.getFiltered<T>(this.restAPI, filter, this.conversion);
  }

  async dbGetAll(): Promise<Map<string, T>> {
    return this.comService.getAll<T>(this.restAPI, this.conversion);
  }

  async dbInsert(elem: T): Promise<void> {
    this.comService.insert(this.restAPI, elem);
  }

  async dbUpdate(elem: T): Promise<void> {
    this.comService.update(this.restAPI, elem);
  }

  async dbDisableId(id: string) {
    this.dbDisable({ _id: id });
  }

  async dbDisable (filter: object): Promise<void> {
    this.comService.disable(this.restAPI, filter);
  }

  async dbDdisableAll(): Promise<void> {
    this.comService.disableAll(this.restAPI);
  }
}
