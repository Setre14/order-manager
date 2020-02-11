import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RestAPI, RestAction, Type } from '../../../../shared';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
    private types: Map<string, Type> = new Map<string, Type>();

    constructor(
        private comService: CommunicationService,
        private itemService: ItemService
    ) { }

    getType(typeId: string): Type {
        return this.types.get(typeId);
    }

    getTypes(): Type[] {
        return Array.from(this.types.values());
    }

    hasType(type: string): boolean {
        this.getTypes().forEach(t => {
            if (t.name == type) {
                return true;
            }
        })

        return false;
    }

    addType(t: string): void {
        if (!this.hasType(t)) {
            const type = new Type(t);
            this.types.set(type._id, type);
            this.comService.post(RestAPI.TYPE, RestAction.INSERT,type);
        }
    }

    delete(id: string): void {
        this.itemService.deleteType(id);
        this.types.delete(id)
        this.comService.post(RestAPI.TYPE, RestAction.DELETE, { _id: id});
    }
    
    async load(): Promise<void> {
        await this.comService.get<Type>(RestAPI.TYPE, RestAction.ALL).then(res => {
            const types = new Map<string, Type>();
            res.forEach(r => {
                types.set(r._id, r);
            });
            this.types = types;
        });
    }
}