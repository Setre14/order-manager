import {MongoDB} from '../mongodb'
import {Item} from "../../../shared/src/class/item";

export class ItemController extends MongoDB {
    static COLLECTION_NAME = 'item';
    static INDEX = ['name'];

    static async getByType(fType: String) {
        return this.get({ type: fType})
    }
}

