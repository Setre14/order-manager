import { FloorplanController } from '../controllers/floorplan.controller';
import { Floorplan, RestAPI } from '../../../shared';
import { DefaultRouter } from './default.router';

export class FloorplanRouter extends DefaultRouter<Floorplan> {
  rootPath = RestAPI.FLOORPLAN;
  controller = new FloorplanController();
}
