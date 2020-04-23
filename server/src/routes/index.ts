import { Router } from 'express';

import { AuthRouter } from './auth.router';
import { CommentRouter } from './comment.router';
import { TableRouter } from './table.router';
import { BaseRouter } from './base.router';
import { FavTabelRouter } from './fav-table.router';
import { FloorplanRouter } from './floorplan.router';
import { ItemRouter } from './item.router';
import { LocRouter } from './loc.router';
import { OrderRouter } from './order.router';
import { TypeRouter } from './type.router';
import { UserRouter } from './user.router';

const routes = Router();

const routers: BaseRouter[] = [
  new AuthRouter(),
  new CommentRouter(),
  new FavTabelRouter(),
  new FloorplanRouter(),
  new ItemRouter(),
  new LocRouter(),
  new OrderRouter(),
  new TableRouter(),
  new TypeRouter(),
  new UserRouter(),
];

routers.forEach(router => router.addRoute(routes));

export default routes;
