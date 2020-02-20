import { MongoDB } from '../mongodb';

export class FloorplanController extends MongoDB {
  static COLLECTION_NAME = 'floorplan';
  static INDEX = ['location'];
}
