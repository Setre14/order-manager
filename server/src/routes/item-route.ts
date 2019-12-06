import { Router } from "express";
import {ItemController} from "../controllers/ItemController";

const router = Router();

router.get("/all", (req, res) => {
    ItemController.getAll().then(result => {
        res.send(result);
    });
});

router.post("/insert", (req, res) => {
    ItemController.insert(req.body);
    res.send('Inserted');
});

export default router;
