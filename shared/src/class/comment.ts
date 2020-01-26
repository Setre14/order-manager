export class Comment {
    comment: string;
    manual: boolean = false;
    types: string[]

    hasType(type: string): boolean {
        return this.types.includes(type);
    }

    isManual(): boolean {
        return this.manual;
    }

    static copy(com: Comment): Comment {
        const comment: Comment = new Comment();
        comment.comment = com.comment;
        comment.manual = com.manual;
        comment.types = com.types;
        
        return comment;
    }
}
