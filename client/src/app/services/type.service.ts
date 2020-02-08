import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RestAPI, RestAction } from '../../../../shared';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
    private types: string[] = [];

    constructor(
        private comService: CommunicationService,
        private itemService: ItemService
    ) { }

    async loadTypes(): Promise<void> {
        await this.comService.get<string>(RestAPI.TYPE, RestAction.ALL).then(res => this.types = res);
    }

    getTypes(): string[] {
        return this.types.sort();
    }

    addType(t: string): void {
        if (!this.types.includes(t)) {
            this.types.push(t);
            this.comService.post(RestAPI.TYPE, RestAction.INSERT, { type: t });
        }
    }

    delete(t: string): void {
        this.itemService.deleteType(t);
        this.types = this.types.filter(type => type !== t);
        this.comService.post(RestAPI.TYPE, RestAction.DELETE, { type: t });
    }
}
