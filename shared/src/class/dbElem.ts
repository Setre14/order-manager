import { v1 as uuid } from 'uuid'

export class DBElem {
    _id: string = uuid();

    static fromJson(obj: DBElem): DBElem {
        return { _id: obj._id};
    }
}