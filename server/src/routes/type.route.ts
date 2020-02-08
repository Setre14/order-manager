import { Router } from "express";
import {TypeController} from "../controllers/TypeController";
import {RestAction} from "../../../shared";
import { ItemController } from "../controllers/ItemController";

const router = Router();

router.get(`/${RestAction.ALL}`, (req, res) => {
    TypeController.getAll<any>().then(result => {
        const types: string[] = [];
        result.forEach(r => types.push(r.type))
        res.send(types);
    });
});

router.post(`/${RestAction.INSERT}`, (req, res) => {
    TypeController.insert(req.body);
    res.send();
});

router.post(`/${RestAction.DELETE}`, (req, res) => {
    TypeController.delete(req.body);
    res.send();
});

export default router;
