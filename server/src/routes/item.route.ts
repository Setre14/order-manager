import { Router } from "express";
import {ItemController} from "../controllers/ItemController";
import {Item, RestAction} from "../../../shared";

const router = Router();

router.get(`/${RestAction.ALL}`, (req, res) => {
    ItemController.getAll<Item>().then(result => {
        res.send(result);
    });
});

router.post(`/${RestAction.INSERT}`, (req, res) => {
    ItemController.insert(req.body);
    res.send();
});

export default router;
