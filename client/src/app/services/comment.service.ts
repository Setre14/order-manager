import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RestAPI, RestAction, Comment } from '../../../../shared';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  comments: Map<string, Comment> = new Map<string, Comment>();


  constructor(
    private comService: CommunicationService
  ) { }

  getComment(commentId: string): Comment {
    return this.comments.get(commentId);
  }

  getComments(): Comment[] {
    return Array.from(this.comments.values());
  }

  getCommentsByType(type: string): Comment[] {
    return this.getComments().filter((comment: Comment) => comment.hasType(type));
  }

  addComment(comment: Comment): void {
    // if (!this.comments.includes(comment)) {
      this.comments.set(comment._id, comment);
      this.comService.post(RestAPI.COMMENT, RestAction.UPDATE, comment);
    // }
  }

  async load(): Promise<void> {
    await this.comService.get<Comment>(RestAPI.COMMENT, RestAction.ALL).then(result => {
      const comments = new Map<string, Comment>();
      result.forEach(res => comments.set(res._id, Comment.fromJson(res)));
      this.comments = comments;;
    })
  }

  delete(id: string): void {
    this.comments.delete(id);
    this.comService.post(RestAPI.COMMENT, RestAction.DELETE, { _id: id});
  }

  deleteType(comment: Comment, typeId: string) {
    comment.deleteType(typeId);
    this.update(comment);
  }

  update(comment: Comment) {
    this.comService.post(RestAPI.COMMENT, RestAction.UPDATE, comment);
  }
}
