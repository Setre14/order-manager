import { Router } from 'express';
import { LocController } from '../controllers/LocController';
import { RestAction } from '../../../shared';

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

router.post(`/${RestAction.DISABLE}`, (req, res) => {
  LocController.disable(req.body);
  res.send();
});

router.get(`/${RestAction.DISABLE_ALL}`, (req, res) => disableAll(res));

async function disableAll(res: any) {
  await LocController.disableAll();
  res.send();
}

export default router;
