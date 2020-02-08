import { Router } from "express";
import {LocationController} from "../controllers/LocationController";
import {Item, RestAction, RestAPI} from "../../../shared";
import { TableController } from "../controllers/TableController";

const router = Router();

router.get(`/${RestAction.ALL}`, (req, res) => {
    LocationController.getAll<any>().then(result => {
        const locations: string[] = [];
        result.forEach(r => locations.push(r.location))
        res.send(locations);
    });
});

router.post(`/${RestAction.INSERT}`, (req, res) => {
    LocationController.insert(req.body);
    res.send();
});


router.post(`/${RestAction.DELETE}`, (req, res) => {
    LocationController.delete(req.body);
    res.send();
});

export default router;