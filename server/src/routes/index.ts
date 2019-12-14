
import { Router } from "express";
import orderRoute from "./order.route";
import userRoute from "./user.route";
import locationRoute from "./location.route";
import favTableRoute from "./fav-table.route";
import itemRoute from "./item.route";
import tableRoute from "./table.route";
import typeRoute from "./type.route";
import {RestAPI} from "../../../shared";

const routes = Router();

routes.use(`/${RestAPI.ORDER}`, orderRoute);
routes.use(`/${RestAPI.USER}`, userRoute);
routes.use(`/${RestAPI.ITEM}`, itemRoute);
routes.use(`/${RestAPI.FAV_TABLE}`, favTableRoute);
routes.use(`/${RestAPI.LOCATION}`, locationRoute);
routes.use(`/${RestAPI.TABLE}`, tableRoute);
routes.use(`/${RestAPI.TYPE}`, typeRoute);

export default routes;
