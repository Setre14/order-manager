import { Component, OnInit } from '@angular/core';
import { Comment, Type } from '../../../../../../shared';
import { CommentService } from 'src/app/services/comment.service';
import { ModalController } from '@ionic/angular';
import { ManageAddCommentComponent } from '../add/add-comment/add-comment.component';
import { TypeService } from 'src/app/services/type.service';

@Component({
  selector: 'app-manage-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class ManageCommentComponent implements OnInit {
  expandedComment: Comment;

  constructor(
    private modalCtrl: ModalController,
    private typeService: TypeService,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.typeService.load();
    this.commentService.load();
  }

  getComments(): Comment[] {
    return this.commentService.getComments();
  }

  getCommentTypes(comment: Comment): Type[] {
    const types: Type[] = [];

    comment.types.forEach(typeId => types.push(this.typeService.getType(typeId)));
    console.log(types)

    return types;
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
    this.commentService.delete(comment._id)
  }

  deleteCommentType(comment: Comment, type: string): void {
    this.commentService.deleteType(comment, type);
  }
}
