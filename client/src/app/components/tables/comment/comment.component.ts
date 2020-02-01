import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { OrderItem, OrderComment } from '../../../../../../shared';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() orderItem: OrderItem;

  comments: Map<string, OrderComment> = new Map<string, OrderComment>();
  customComments: string[] = [];
  customComment: string;

  constructor(
    private modalCtrl: ModalController,
    private commentService: CommentService,
  ) { }

  ngOnInit() {
    this.commentService.load();

    this.orderItem.getComments().forEach(orderComment => this.comments.set(orderComment.getComment(), orderComment));
  }

  getComments(): string[] {
    let allComments = this.commentService.getCommentsByType(this.orderItem.getType());

    allComments = allComments.concat(this.customComments)

    return allComments;
  }

  getAmount(comment: string): number {
    const orderComment = this.comments.get(comment);
    if (!orderComment) {
      return 0;
    } else {
      return orderComment.getAmount();
    }
  }

  addComment(comment: string): void {
    const orderComment = this.comments.get(comment);
    if (!orderComment) {
      this.comments.set(comment, new OrderComment(comment));
    } else {
      if (orderComment.getAmount() < this.orderItem.getOpenAmount()) {
        orderComment.incAmount();
      }
    }
  }

  remove(comment): void {
    const orderComment = this.comments.get(comment);
    orderComment.decAmount();
    if (orderComment.getAmount() == 0) {
      const comment = orderComment.getComment();
      this.comments.delete(comment);
      if (this.customComments.includes(comment)) {
        this.customComments = this.customComments.filter(com => com != comment);
      }
    }
  }

  addCustomComment(): void {
    this.customComments.push(this.customComment);
    this.addComment(this.customComment)
    this.customComment = '';
  }

  save(): void {
    this.orderItem.addCommentMap(this.comments)
    
    this.close();
  }

  close(): void {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
