import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { RestAction, RestAPI } from '../../../shared';
import { BaseRouter } from './base.router';

export class AuthRouter extends BaseRouter {
  rootPath = RestAPI.AUTH;
  controller = new AuthController();

  addRoute(router: Router) {
    console.log(this.rootPath);
    router.use(`/${this.rootPath}`, this.getRouter());
  }

  getRouter(): Router {
    const router = Router();

    router.post(`/${RestAction.AUTHENTICATE}`, (req, res) =>
      this.auth(req, res)
    );

    return router;
  }

  async auth(req: any, res: any) {
    this.controller.login(req, res).then(token => res.send(token));
  }
}
