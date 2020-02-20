import { Router } from 'express';
import { Order, RestAction } from '../../../shared';
import { OrderController } from '../controllers/OrderController';

const router = Router();

router.get(`/${RestAction.ALL}`, (req, res) => {
  OrderController.getAll<Order>().then(result => {
    res.send(result);
  });
});

router.post(`/${RestAction.GET}`, (req, res) => get(req, res));

async function get(req: any, res: any) {
  await OrderController.get<Object>(req.body).then(result => {
    res.send(result);
  });
}

router.post(`/${RestAction.INSERT}`, (req, res) => insert(req, res));

router.post(`/${RestAction.INSERT_OR_UPDATE}`, (req, res) => update(req, res));

async function insert(req: any, res: any) {
  await OrderController.insert(req.body);
  res.send();
}

async function update(req: any, res: any) {
  const order: Order = req.body;
  await OrderController.insertOrUpdate({ _id: order._id }, order);
  res.send();
}

export default router;
