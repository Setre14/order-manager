import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RestAPI, Comment } from '../../../../shared';
import { StorableService } from './storable.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService extends StorableService<Comment> {
  restAPI = RestAPI.COMMENT;
  conversion = Comment.fromJson;

  elements: Map<string, Comment> = new Map<string, Comment>();

  constructor(protected comService: CommunicationService) {
    super(comService);
  }

  getComment(commentId: string): Comment {
    return this.elements.get(commentId);
  }

  getComments(): Comment[] {
    return Array.from(this.elements.values());
  }

  getCommentsByType(type: string): Comment[] {
    return this.getComments().filter((comment: Comment) =>
      comment.hasType(type)
    );
  }

  addComment(comment: Comment): void {
    // if (!this.elements.includes(comment)) {
    this.elements.set(comment._id, comment);
    this.dbUpdate(comment);
    // }
  }

  delete(id: string): void {
    this.elements.delete(id);
    this.dbDisableId(id);
  }

  deleteType(comment: Comment, typeId: string) {
    comment.deleteType(typeId);
    this.dbUpdate(comment);
  }
}
