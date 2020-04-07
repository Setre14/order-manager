import { Component, OnInit } from '@angular/core';
import { TypeService } from 'src/app/services/type.service';
import { CommentService } from 'src/app/services/comment.service';
import { ModalController } from '@ionic/angular';
import { Comment, ItemType } from '../../../../../../../shared';
import { UtilService } from 'src/app/services/util.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['../../../../style.scss'],
})
export class ManageAddCommentComponent implements OnInit {
  commentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private commentService: CommentService,
    private typeService: TypeService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.typeService.load();

    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required],
      types: [[], Validators.required]
    });
  }

  getTypes(): ItemType[] {
    return this.typeService.getTypes();
  }

  isCommentDefined() {
    const commentValue = this.commentForm.value
    return commentValue.comment && commentValue.types.length > 0;
  }

  addComment(): void {
    const commentValue = this.commentForm.value
    if (!this.isCommentDefined()) {
      return
    }

    const com = new Comment();
    com.name = commentValue.comment;
    com.typeIds = commentValue.types;

    this.commentService.addComment(com);
    this.utilService.showToast('Kommentar hinzugefügt');
  }

  toggle(event) {
    const type = event.target.title;

    const types = this.commentForm.value.types

    if (types.includes(type)) {
      types.splice(types.indexOf(type), 1);
    } else {
      types.push(type);
    }
  }

  close(): void {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
