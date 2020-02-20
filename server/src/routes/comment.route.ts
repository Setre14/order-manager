import { Router } from 'express';
import { CommentController } from '../controllers/CommentController';
import { RestAction, Comment } from '../../../shared';

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

router.post(`/${RestAction.INSERT_OR_UPDATE}`, (req, res) => {
  const comment: Comment = req.body;
  CommentController.insertOrUpdate({ _id: comment._id }, comment);
  res.send();
});

router.post(`/${RestAction.DELETE}`, (req, res) => {
  CommentController.delete(req.body);
  res.send();
});

export default router;
