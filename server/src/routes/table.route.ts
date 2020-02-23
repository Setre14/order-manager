import { Router } from 'express';
import { TableController } from '../controllers/TableController';
import { RestAction } from '../../../shared';

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

router.post(`/${RestAction.DISABLE}`, (req, res) => {
  TableController.disable(req.body);
  res.send();
});

router.get(`/${RestAction.DISABLE_ALL}`, (req, res) => disableAll(res));

async function disableAll(res: any) {
  await TableController.disableAll();
  res.send();
}

export default router;
