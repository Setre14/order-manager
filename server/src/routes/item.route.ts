import { Router } from "express";
import {ItemController} from "../controllers/ItemController";
import {Item, RestAction} from "../../../shared";

const router = Router();

router.get(`/${RestAction.ALL}`, (req, res) => {
    ItemController.getAll<Item>().then(result => {
        res.send(result);
    });
});

router.post(`/${RestAction.INSERT}`, (req, res) => insert(req, res));

async function insert(req: any, res: any) {
    await ItemController.insert(req.body);
    res.send();
}

router.post(`/${RestAction.INSERT_OR_UPDATE}`, (req, res) => update(req, res));

async function update(req: any, res: any) {
    const item: Item = req.body;
    await ItemController.insertOrUpdate({ name: item.name }, item);
    res.send();
}

router.post(`/${RestAction.DELETE}`, (req, res) => {
    ItemController.delete(req.body);
    res.send();
});

export default router;
