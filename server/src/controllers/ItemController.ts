import { MongoDB } from '../mongodb'

export class ItemController extends MongoDB {
    static COLLECTION_NAME = 'item';
    static INDEX = ['name'];

    static async getByType(fType: String) {
        return this.get({ type: fType })
    }
}

