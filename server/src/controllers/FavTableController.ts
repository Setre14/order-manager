import {MongoDB} from '../mongodb'

export class FavTableController extends MongoDB {
    static COLLECTION_NAME = 'fav-table';
    static INDEX = ['user'];
}

