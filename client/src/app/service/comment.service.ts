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

  getCommentsByType(type: string): Comment[] {
    return this.comments.filter((comment: Comment) => comment.hasType(type));
  }

  addComment(comment: Comment): void {
    // if (!this.comments.includes(comment)) {
      this.comments.push(comment);
      this.comService.post(RestAPI.COMMENT, RestAction.UPDATE, comment);
    // }
  }

  async load(): Promise<void> {
    this.comments = [];
    await this.comService.get<Comment>(RestAPI.COMMENT, RestAction.ALL).then(result => {
      result.forEach(res => this.comments.push(Comment.copy(res)));
    })
  }
}
