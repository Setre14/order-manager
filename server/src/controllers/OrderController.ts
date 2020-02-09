import {MongoDB} from '../mongodb'

export class OrderController extends MongoDB {
    static COLLECTION_NAME = 'order';
    static INDEX = [];
}

