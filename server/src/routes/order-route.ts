
import { Router } from "express";
import {Order, RestAction} from "../../../shared/src";
import {OrderController} from "../controllers/OrderController";

const router = Router();

router.get(`/${RestAction.ALL}`, (req, res) => {
    OrderController.getAll<Order>().then(result => {
        res.send(result);
    });
});

router.post(`/${RestAction.GET}`, (req, res) => {
    console.log(req.body)
    OrderController.get<Object>(req.body).then(result => {
        res.send(result);
    });
});

router.post(`/${RestAction.INSERT}`, (req, res) => {
    console.log(req.body);
    OrderController.insert(req.body);
    res.send();
});

// //Login route
// router.post("/login", AuthController.login);

// //Change my password
// router.post("/change-password", [checkJwt], AuthController.changePassword);

export default router;
