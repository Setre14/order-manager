import { UserController } from '../controllers/user.controller';
import { User, Role, RestAPI } from '../../../shared';
import * as bcrypt from 'bcryptjs';
import { DefaultRouter } from './default.router';

export class UserRouter extends DefaultRouter<User> {
  rootPath = RestAPI.USER;
  controller = new UserController();

  async insert(req: any, res: any) {
    const user: User = req.body;
    user.password = bcrypt.hashSync(user.password, 8);
    this.controller.insert(user);
    res.send('Inserted');
  }

  async update(req: any, res: any) {
    const user: User = req.body;
    user.password = bcrypt.hashSync(user.password, 8);
    if (user.role == Role.ADMIN) {
      this.controller.disable({ default: true });
    }
    this.controller.insert(user);
    res.send('Updated');
  }
}
