import { Router } from "express";
import {ItemController} from "../controllers/ItemController";
import {RestAction, RestAPI} from "../../../shared/src";

const router = Router();

router.get(`/${RestAction.ALL}`, (req, res) => {
    ItemController.getAll().then(result => {
        res.send(result);
    });
});

router.post(`/${RestAction.INSERT}`, (req, res) => {
    ItemController.insert(req.body);
    res.send('Inserted');
});

export default router;
