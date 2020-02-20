import { Router } from "express";
import { LocController } from "../controllers/LocController";
import { RestAction } from "../../../shared";

const router = Router();

router.get(`/${RestAction.ALL}`, (req, res) => {
    LocController.getAll<any>().then(result => {
        res.send(result);
    });
});

router.post(`/${RestAction.INSERT}`, (req, res) => {
    LocController.insert(req.body);
    res.send();
});


router.post(`/${RestAction.DELETE}`, (req, res) => {
    LocController.delete(req.body);
    res.send();
});

export default router;