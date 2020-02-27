import { MongoDB } from '../mongodb';

export class TokenController extends MongoDB {
  static COLLECTION_NAME = 'token';
  static INDEX = ['userId'];
}
