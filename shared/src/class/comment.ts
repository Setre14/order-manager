import { DBElem } from './dbElem';

export class Comment extends DBElem {
    comment: string = '';
    types: string[] = [];

    hasType(type: string): boolean {
        return this.types.includes(type);
    }

    getTypes(): string[] {
        return this.types.sort();
    }

    deleteType(type: string): void {
        this.types = this.types.filter(t => t != type);
    }

    static fromJson(com: Comment): Comment {
        const comment: Comment = new Comment();
        comment._id = com._id;
        comment.comment = com.comment;
        comment.types = com.types;
        
        return comment;
    }
}
