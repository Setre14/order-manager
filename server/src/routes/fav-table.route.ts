import { Router } from "express";
import {FavTableController} from "../controllers/FavTableController";
import {RestAction, FavTable} from "../../../shared";

const router = Router();

router.get(`/${RestAction.ALL}`, (req, res) => {
    FavTableController.getAll().then(result => {
        res.send(result);
    });
});

router.post(`/${RestAction.GET}`, (req, res) => {
    FavTableController.get(req.body).then(result => {
        res.send(result);
    });
});

router.post(`/${RestAction.INSERT}`, (req, res) => {
    FavTableController.insert(req.body);
    res.send();
});

router.post(`/${RestAction.INSERT_OR_UPDATE}`, (req, res) => {
    const favTable: FavTable = req.body;
    FavTableController.insertOrUpdate({ user: favTable.user }, favTable);
    res.send();
});

export default router;
