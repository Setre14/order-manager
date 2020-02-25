import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { RestAction, FavTable } from '../../../shared';

const router = Router();

router.post(`/${RestAction.AUTHENTICATE}`, (req, res) => {
  AuthController.login(req, res).then(token => res.send({ token: token }));
});

export default router;
