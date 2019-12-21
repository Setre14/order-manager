import { Router } from "express";
import {FloorplanController} from "../controllers/FloorplanController";
import { Floorplan, RestAction } from "../../../shared/src";

const router = Router();

router.get(`/${RestAction.ALL}`, (req, res) => {
    FloorplanController.getAll<Floorplan>().then(result => {
        res.send(result);
    });
});

router.post(`/${RestAction.INSERT}`, (req, res) => {
    FloorplanController.insert(req.body);
    res.send();
});

router.post(`/${RestAction.UPDATE}`, (req, res) => {
    const floorplan: Floorplan = req.body;
    FloorplanController.update({ location: floorplan.location }, floorplan );
    res.send();
});

export default router;
