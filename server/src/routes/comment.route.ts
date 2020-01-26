import { Router } from "express";
import {CommentController} from "../controllers/CommentController";
import {RestAction, Comment} from "../../../shared";

const router = Router();

router.get(`/${RestAction.ALL}`, (req, res) => {
    CommentController.getAll<any>().then((result: any[]) => {
        res.send(result);
    });
});

router.post(`/${RestAction.INSERT}`, (req, res) => {
    CommentController.insert(req.body);
    res.send();
});

router.post(`/${RestAction.UPDATE}`, (req, res) => {
    const comment: any = req.body;
    CommentController.update({ comment: comment.comment }, comment);
    res.send();
});

export default router;
