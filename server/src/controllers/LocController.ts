import {MongoDB} from '../mongodb'

export class LocController extends MongoDB {
    static COLLECTION_NAME = 'loc';
    static INDEX = ['name'];
}
