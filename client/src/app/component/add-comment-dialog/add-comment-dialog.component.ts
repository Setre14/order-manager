import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommentService } from 'src/app/service/comment.service';
import { TypeService } from 'src/app/service/type.service';
import { Comment } from '../../../../../shared';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-add-comment-dialog',
  templateUrl: './add-comment-dialog.component.html',
  styleUrls: ['./add-comment-dialog.component.scss']
})
export class AddCommentDialogComponent implements OnInit {
  commentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private typeService: TypeService,
    private utilService: UtilService
  ) { 
    this.commentForm = this.formBuilder.group({
      comment: '',
      manual: false,
      types: []
    });
  }

  ngOnInit() {
    this.typeService.loadTypes();
  }

  getTypes(): string[] {
    return this.typeService.getTypes();
  }

  toggleType(type: string) {
    let types: string[] = this.commentForm.value.types;
    if (types == null) {
      types = [];
    }
    if (types.includes(type)) {
      types.splice(types.indexOf(type), 1);
    } else {
      types.push(type);
    }
    this.commentForm.value.types = types;
  }

  onSubmitComment(comment: Comment) {
    if (comment.comment == '') {
      this.utilService.showSnackbar('Comment must be set');
      return;
    }

    this.commentService.addComment(comment)
    this.commentForm.reset();
  }

}
