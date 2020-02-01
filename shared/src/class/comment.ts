export class Comment {
    comment: string = '';
    types: string[] = [];

    hasType(type: string): boolean {
        return this.types.includes(type);
    }

    getTypes(): string[] {
        return this.types.sort();
    }

    static copy(com: Comment): Comment {
        const comment: Comment = new Comment();
        comment.comment = com.comment;
        comment.types = com.types;
        
        return comment;
    }
}
