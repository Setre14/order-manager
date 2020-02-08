import { Component, OnInit } from '@angular/core';
import { TypeService } from 'src/app/services/type.service';
import { CommentService } from 'src/app/services/comment.service';
import { ModalController } from '@ionic/angular';
import { Comment } from '../../../../../../../shared';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class ManageAddCommentComponent implements OnInit {
  comment: string;
  types: string[] = [];

  constructor(
    private modalCtrl: ModalController,
    private commentService: CommentService,
    private typeService: TypeService
  ) { }

  ngOnInit() {
    this.typeService.loadTypes();
  }

  getTypes(): string[] {
    return this.typeService.getTypes();
  }

  addType() {
    // this.typeService.addType(this.type);
    // this.type = '';
  }

  isCommentDefined(): boolean {
    if (!this.comment || !this.types || this.types.length <= 0) {
      return false;
    }

    return true;
  }

  addComment(): void {
    if (!this.isCommentDefined()) {
      return;
    }

    const com = new Comment();
    com.comment = this.comment;
    com.types = this.types;

    this.commentService.addComment(com);
    this.comment = '';
  }

  toggle(event) {
    const type = event.target.title;

    if (this.types.includes(type)) {
      this.types.splice(this.types.indexOf(type), 1);
    } else {
      this.types.push(type);
    }
  }

  close(): void {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
