
import { Router } from "express";
import orderRoute from "./order-route";
import userRoute from "./user-route";
import itemRoute from "./item-route";

const routes = Router();

routes.use("/order", orderRoute);
routes.use("/user", userRoute);
routes.use("/item", itemRoute);

export default routes;
