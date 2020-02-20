import { DBElem } from './dbElem';

export class Type extends DBElem {
    name: string;

    constructor(type: string) {
        super();
        this.name = type;
    }

    static fromJson(obj: Type): Type {
        const type = new Type(obj.name);
        type._id = obj._id;
        type.disabled = obj.disabled;

        return type;
    }
}