import { DBElem } from './dbElem';

export class Comment extends DBElem {
  name: string = '';
  typeIds: string[] = [];

  hasType(type: string): boolean {
    return this.typeIds.includes(type);
  }

  getTypes(): string[] {
    return this.typeIds.sort();
  }

  deleteType(type: string): void {
    this.typeIds = this.typeIds.filter(t => t != type);
  }

  static fromJson(com: Comment): Comment {
    const comment: Comment = new Comment();
    comment._id = com._id;
    comment.name = com.name;
    comment.typeIds = com.typeIds;
    comment.disabled = com.disabled;

    return comment;
  }
}
