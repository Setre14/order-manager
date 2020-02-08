import { Component, OnInit } from '@angular/core';
import { Comment } from '../../../../../../shared';
import { CommentService } from 'src/app/services/comment.service';
import { ModalController } from '@ionic/angular';
import { ManageAddCommentComponent } from '../add/add-comment/add-comment.component';

@Component({
  selector: 'app-manage-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class ManageCommentComponent implements OnInit {
  expandedComment: Comment;

  constructor(
    private modalCtrl: ModalController,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.commentService.load();
  }

  getComments(): Comment[] {
    return this.commentService.getComments();
  }

  getCommentTypes(comment: Comment): string[] {
    return comment.getTypes();
  }

  expand(comment: Comment): void {
    this.expandedComment = this.expandedComment == comment ? null : comment;
  }

  isExpanded(comment: Comment): boolean {
    return this.expandedComment == comment;
  }

  async add(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ManageAddCommentComponent
    });
    await modal.present();
  }

  deleteComment(comment: Comment): void {
    this.commentService.delete(comment)
  }

  deleteCommentType(comment: Comment, type: string): void {
    this.commentService.deleteType(comment, type);
  }
}
