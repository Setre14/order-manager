import { Router } from 'express';
import { RestAction, DBElem } from '../../../shared';
import { BaseRouter } from './base.router';
import { BaseController } from '../controllers/base.controller';

export abstract class DefaultRouter<T extends DBElem> extends BaseRouter {
  abstract rootPath: string;
  abstract controller: BaseController;

  getRouter(): Router {
    const router = Router();

    router.post(`/${RestAction.GET}`, (req, res) => this.get(req, res));

    router.get(`/${RestAction.ALL}`, (req, res) => this.getAll(req, res));

    router.post(`/${RestAction.INSERT}`, (req, res) => this.insert(req, res));

    router.post(`/${RestAction.INSERT_OR_UPDATE}`, (req, res) =>
      this.update(req, res)
    );

    router.post(`/${RestAction.DISABLE}`, (req, res) => this.disable(req, res));

    router.get(`/${RestAction.DISABLE_ALL}`, (req, res) =>
      this.disableAll(req, res)
    );

    return router;
  }

  async get(req: any, res: any) {
    this.controller.get<T>(req.body).then((result: T[]) => {
      res.send(result);
    });
  }

  async getAll(req: any, res: any) {
    this.controller.getAll<T>().then((result: T[]) => {
      res.send(result);
    });
  }

  async insert(req: any, res: any) {
    this.controller.insert(req.body).then(() => res.send());
  }

  async update(req: any, res: any) {
    const elem: T = req.body;
    this.controller
      .insertOrUpdate({ _id: elem._id }, elem)
      .then(() => res.send());
  }

  async disable(req: any, res: any) {
    this.controller.disable(req.body).then(res.send());
  }

  async disableAll(req: any, res: any) {
    this.controller.disableAll().then(res.send());
  }
}
