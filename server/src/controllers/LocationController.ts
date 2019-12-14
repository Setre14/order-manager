import {MongoDB} from '../mongodb'

export class LocationController extends MongoDB {
    static COLLECTION_NAME = 'location';
    static INDEX = ['location'];
}

