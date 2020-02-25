import { Router } from 'express';
import orderRoute from './order.route';
import userRoute from './user.route';
import locRoute from './loc.route';
import floorplanRoute from './floorplan.route';
import favTableRoute from './fav-table.route';
import itemRoute from './item.route';
import tableRoute from './table.route';
import typeRoute from './type.route';
import commentRoute from './comment.route';
import authRoute from './auth.route';
import { RestAPI } from '../../../shared';

const routes = Router();

routes.use(`/${RestAPI.ORDER}`, orderRoute);
routes.use(`/${RestAPI.USER}`, userRoute);
routes.use(`/${RestAPI.ITEM}`, itemRoute);
routes.use(`/${RestAPI.FAV_TABLE}`, favTableRoute);
routes.use(`/${RestAPI.FLOORPLAN}`, floorplanRoute);
routes.use(`/${RestAPI.LOCATION}`, locRoute);
routes.use(`/${RestAPI.TABLE}`, tableRoute);
routes.use(`/${RestAPI.TYPE}`, typeRoute);
routes.use(`/${RestAPI.COMMENT}`, commentRoute);
routes.use(`/${RestAPI.AUTH}`, authRoute);

export default routes;
