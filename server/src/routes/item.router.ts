import { ItemController } from '../controllers/item.controller';
import { Item, RestAPI } from '../../../shared';
import { DefaultRouter } from './default.router';

export class ItemRouter extends DefaultRouter<Item> {
  rootPath = RestAPI.ITEM;
  controller = new ItemController();
}
