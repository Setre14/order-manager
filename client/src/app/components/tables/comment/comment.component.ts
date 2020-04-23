import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { OrderItem, OrderComment, Comment } from '../../../../../../shared';
import { ModalController } from '@ionic/angular';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['../../../style.scss'],
})
export class CommentComponent implements OnInit {
  @Input() orderItem: OrderItem;

  comments: Map<string, OrderComment> = new Map<string, OrderComment>();
  customComments: string[] = [];
  customComment: string;

  constructor(
    private modalCtrl: ModalController,
    private itemService: ItemService,
    private commentService: CommentService
  ) {}

  async ngOnInit() {
    await this.commentService.load();
    await this.itemService.load();

    this.orderItem
      .getComments()
      .forEach(orderComment =>
        this.comments.set(orderComment.comment, orderComment)
      );
  }

  getComments(): string[] {
    let allComments = this.commentService
      .getCommentsByType(this.itemService.getItem(this.orderItem.itemId).typeId)
      .map(comment => comment.name);

    allComments = allComments.concat(this.customComments);

    return allComments;
  }

  getAmount(comment: string): number {
    const orderComment = this.comments.get(comment);
    if (!orderComment) {
      return 0;
    } else {
      return orderComment.amount;
    }
  }

  addComment(comment: string): void {
    const orderComment = this.comments.get(comment);
    if (!orderComment) {
      this.comments.set(comment, new OrderComment(comment));
    } else {
      if (orderComment.amount < this.orderItem.amount) {
        orderComment.incAmount();
      }
    }
  }

  remove(comment: string): void {
    const orderComment = this.comments.get(comment);
    orderComment.decAmount();
    if (orderComment.amount == 0) {
      // const comment = orderComment.comment;
      this.comments.delete(comment);
      // if (this.customComments.includes(comment)) {
      //   this.customComments = this.customComments.filter(com => com != comment);
      // }
    }
  }

  addCustomComment(): void {
    this.customComments.push(this.customComment);
    this.addComment(this.customComment);
    this.customComment = '';
  }

  save(): void {
    this.orderItem.addCommentMap(this.comments);

    this.close();
  }

  close(): void {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
