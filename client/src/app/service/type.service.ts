import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RestAPI, RestAction } from '../../../../shared';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
    private types: string[] = [];

    constructor(
        public comService: CommunicationService
    ) { }

    loadTypes() {
        this.comService.get<string>(RestAPI.TYPE, RestAction.ALL).then(res => this.types = res);
    }

    getTypes(): string[] {
        return this.types
    }

    addType(t: string): void {
        if (!this.types.includes(t)) {
            this.types.push(t);
            this.comService.post(RestAPI.TYPE, RestAction.INSERT, { type: t });
        }
    }
}
