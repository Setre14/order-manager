import { Component, OnInit } from '@angular/core';
import { Comment, ItemType } from '../../../../../../shared';
import { CommentService } from 'src/app/services/comment.service';
import { ModalController } from '@ionic/angular';
import { TypeService } from 'src/app/services/type.service';

@Component({
  selector: 'app-manage-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['../../../style.scss'],
})
export class ManageCommentComponent implements OnInit {
  expandedComment: Comment;

  constructor(
    private modalCtrl: ModalController,
    private typeService: TypeService,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    this.typeService.load();
    this.commentService.load();
  }

  getComments(): Comment[] {
    return this.commentService.getComments();
  }

  getCommentTypes(comment: Comment): ItemType[] {
    const types: ItemType[] = [];

    comment.typeIds.forEach(typeId =>
      types.push(this.typeService.getType(typeId))
    );

    return types;
  }

  expand(comment: Comment): void {
    this.expandedComment = this.expandedComment == comment ? null : comment;
  }

  isExpanded(comment: Comment): boolean {
    return this.expandedComment == comment;
  }

  deleteComment(comment: Comment): void {
    this.commentService.delete(comment._id);
  }

  deleteCommentType(comment: Comment, type: string): void {
    this.commentService.deleteType(comment, type);
  }
}
