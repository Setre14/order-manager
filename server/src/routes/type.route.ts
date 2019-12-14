import { Router } from "express";
import {TypeController} from "../controllers/TypeController";
import {Item, RestAction, RestAPI} from "../../../shared";

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

export default router;
