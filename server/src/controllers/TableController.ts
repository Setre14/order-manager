import {MongoDB} from "../mongodb";

export class TableController extends MongoDB {
    static COLLECTION_NAME = 'table';
    static INDEX = ['table'];
}
