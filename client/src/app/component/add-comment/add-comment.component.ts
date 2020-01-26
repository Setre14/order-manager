import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/service/comment.service';
import { Comment } from '../../../../../shared';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  constructor(
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.commentService.load();
  }

  getComments(): Comment[] {
    return this.commentService.getComments();
  }
}
