import { Router } from "express";
import {TableController} from "../controllers/TableController";
import {RestAction, RestAPI, Table} from "../../../shared";

const router = Router();

router.get(`/${RestAction.ALL}`, (req, res) => {
    TableController.getAll().then(result => {
        res.send(result);
    });
});

router.post(`/${RestAction.GET}`, (req, res) => {
    TableController.get(req.body).then(result => {
        res.send(result);
    });
});

router.post(`/${RestAction.INSERT}`, (req, res) => {
    TableController.insert(req.body);
    res.send();
});

export default router;
