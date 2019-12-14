
import { Router } from "express";
import {Order, RestAction} from "../../../shared";
import {OrderController} from "../controllers/OrderController";

const router = Router();

router.get(`/${RestAction.ALL}`, (req, res) => {
    OrderController.getAll<Order>().then(result => {
        res.send(result);
    });
});

router.post(`/${RestAction.GET}`, (req, res) => {
    OrderController.get<Object>(req.body).then(result => {
        res.send(result);
    });
});

router.post(`/${RestAction.INSERT}`, (req, res) => {
    OrderController.insert(req.body);
    res.send();
});

router.post(`/${RestAction.UPDATE}`, (req, res) => {
    const order: Order = req.body;
    OrderController.update({ uuid: order.uuid}, order );
    res.send();
});

export default router;
