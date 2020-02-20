import { Router } from 'express';
import { TypeController } from '../controllers/TypeController';
import { RestAction } from '../../../shared';

const router = Router();

router.get(`/${RestAction.ALL}`, (req, res) => {
  TypeController.getAll<any>().then(result => {
    res.send(result);
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
