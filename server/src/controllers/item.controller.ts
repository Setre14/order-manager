import { BaseController } from './base.controller';

export class ItemController extends BaseController {
  COLLECTION_NAME = 'item';
  INDEX = ['name'];

  async getByType(fType: String) {
    return this.get({ type: fType });
  }
}
