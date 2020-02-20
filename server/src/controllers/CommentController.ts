import { MongoDB } from '../mongodb';

export class CommentController extends MongoDB {
  static COLLECTION_NAME = 'comment';
  static INDEX = ['name'];
}
