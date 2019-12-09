
import { Router } from "express";
import orderRoute from "./order.route";
import userRoute from "./user.route";
import itemRoute from "./item.route";
import tableRoute from "./table.route";
import typeRoute from "./type.route";
import {RestAPI} from "../../../shared";

const routes = Router();

routes.use(`/${RestAPI.ORDER}`, orderRoute);
routes.use(`/${RestAPI.USER}`, userRoute);
routes.use(`/${RestAPI.ITEM}`, itemRoute);
routes.use(`/${RestAPI.TABLE}`, tableRoute);
routes.use(`/${RestAPI.TYPE}`, typeRoute);

export default routes;
