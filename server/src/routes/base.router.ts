import { Router } from 'express';

export abstract class BaseRouter {
  abstract rootPath: string;

  addRoute(router: Router): void {
    router.use(`/${this.rootPath}`, this.getRouter());
  }

  abstract getRouter(): Router;
}
