import {MongoDB} from "../mongodb";

export class TypeController extends MongoDB {
    static COLLECTION_NAME = 'type';
    static INDEX = ['name'];
}