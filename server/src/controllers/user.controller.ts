import { BaseController } from './base.controller'

export class UserController extends BaseController {
  COLLECTION_NAME = 'user';
  INDEX = ['username'];
}
