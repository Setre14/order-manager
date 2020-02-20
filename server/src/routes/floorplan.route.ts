import { Router } from 'express';
import { FloorplanController } from '../controllers/FloorplanController';
import { Floorplan, RestAction } from '../../../shared';

const router = Router();

router.get(`/${RestAction.ALL}`, (req, res) => {
  FloorplanController.getAll<Floorplan>().then(result => {
    res.send(result);
  });
});

router.post(`/${RestAction.GET}`, (req, res) => {
  FloorplanController.get(req.body).then(result => res.send(result));
});

router.post(`/${RestAction.INSERT}`, (req, res) => {
  FloorplanController.insert(req.body);
  res.send();
});

router.post(`/${RestAction.INSERT_OR_UPDATE}`, (req, res) => {
  const floorplan: Floorplan = req.body;
  FloorplanController.insertOrUpdate(
    { location: floorplan.location },
    floorplan
  );
  res.send();
});

export default router;
