import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RestAPI, RestAction, Comment } from '../../../../shared';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  comments: Comment[] = []


  constructor(
    private comService: CommunicationService
  ) { }

  getComments(): Comment[] {
    return this.comments;
  }

  getCommentsByType(type: string): string[] {
    return this.comments.filter((comment: Comment) => comment.hasType(type)).map(comment => comment.comment);
  }

  addComment(comment: Comment): void {
    // if (!this.comments.includes(comment)) {
      this.comments.push(comment);
      this.comService.post(RestAPI.COMMENT, RestAction.UPDATE, comment);
    // }
  }

  async load(): Promise<void> {
    await this.comService.get<Comment>(RestAPI.COMMENT, RestAction.ALL).then(result => {
      this.comments = [];
      result.forEach(res => this.comments.push(Comment.copy(res)));
    })
  }

  delete(comment: Comment): void {
    this.comments = this.comments.filter(c => c.comment != comment.comment);
    this.comService.post(RestAPI.COMMENT, RestAction.DELETE, comment);
  }

  deleteType(comment: Comment, type: string) {
    comment.deleteType(type);
    this.update(comment);
  }

  update(comment: Comment) {
    this.comService.post(RestAPI.COMMENT, RestAction.UPDATE, comment);
  }
}
