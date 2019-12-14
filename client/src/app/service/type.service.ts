import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RestAPI, RestAction } from '../../../../shared';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
    types: string[] = [];

    constructor(
        public comService: CommunicationService
    ) { }

    loadTypes() {
        this.comService.get<string>(RestAPI.TYPE, RestAction.ALL).then(res => this.types = res);
    }
}
