import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserController } from './user.controller';
import { TokenController } from './token.controller';
import { User, Token, Role } from '../../../shared';
import * as bcrypt from 'bcryptjs';
import { BaseController } from './base.controller';

export class AuthController extends BaseController {
  COLLECTION_NAME = 'comment';
  INDEX = ['name'];

  async login(req: Request, res: Response): Promise<Token[]> {
    let { username, password } = req.body;

    console.log(username, password);

    const userController = new UserController();
    const users = await userController.get<User>({ username: username });

    let user: User;

    if (users.length == 0) {
      const allUser = await userController.getAll<User>();

      if (allUser.length != 0) {
        return [];
      }

      user = new User('admin');
      user.password = bcrypt.hashSync('admin', 8);
      user.role = Role.ADMIN;
      user.firstName = 'admin';
      user.lastName = 'admin';
      user.default = true;

      userController.insert(user);
    } else {
      user = User.fromJson(users[0]);
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return [];
    }

    const t = jwt.sign({ userId: user._id, username: user.username }, 'test', {
      expiresIn: '30d',
    });

    const tokenController = new TokenController();
    const oldTokens: Token[] = await tokenController.get<Token>({
      userId: user._id,
    });

    const token = new Token(t);
    token.userId = user._id;

    if (oldTokens && oldTokens.length > 0) {
      token._id = oldTokens[0]._id;
    }

    const curDate = new Date();

    const expireMonth = curDate.getMonth() == 12 ? 1 : curDate.getMonth() + 1;

    token.expireDate = new Date(
      curDate.getFullYear(),
      expireMonth,
      curDate.getDate()
    );

    tokenController.insertOrUpdate({ userId: token.userId }, token);

    return [token];
  }
}
