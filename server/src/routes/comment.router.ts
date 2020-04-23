import { CommentController } from '../controllers/comment.controller';
import { RestAPI, Comment } from '../../../shared';
import { DefaultRouter } from './default.router';

export class CommentRouter extends DefaultRouter<Comment> {
  rootPath = RestAPI.COMMENT;
  controller = new CommentController();
}
