import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { MongoDB } from '../mongodb';
import { UserController } from './UserController';
import { TokenController } from './TokenController';
import { User, Token } from '../../../shared';
import * as bcrypt from 'bcryptjs';


// import config from "../config/config";


export class AuthController extends MongoDB {
  static COLLECTION_NAME = 'comment';
  static INDEX = ['name'];

  static async login(req: Request, res: Response): Promise<Token[]> {
      let { username, password } = req.body;

      const users = await UserController.get<User>({ username: username });

      let user: User;

      if (users.length == 0) {
        const allUser = await UserController.getAll<User>();

        if (allUser.length != 0) {
          return [];
        }

        user = new User('admin');
        user.password = bcrypt.hashSync('admin', 8);

      } else {
        user = User.fromJson(users[0]);
      }
    
      if (!bcrypt.compareSync(password, user.password)) {
        return [];
      }

      const t = jwt.sign(
        { userId: user._id, username: user.username },
        'test',
        { expiresIn: "30d" }
      );

      const oldTokens: Token[] = await TokenController.get<Token>({ userId: user._id })

      const token = new Token(t);
      token.userId = user._id;

      if (oldTokens && oldTokens.length > 0) {
        token._id = oldTokens[0]._id
      }

      

      const curDate = new Date();

      const expireMonth = curDate.getMonth() == 12 ? 1 : curDate.getMonth() + 1;

      token.expireDate = new Date(curDate.getFullYear(), expireMonth, curDate.getDate())

      TokenController.insertOrUpdate({ userId: token.userId }, token);

      return [token];
    }

    // static changePassword = async (req: Request, res: Response) => {
    //   //Get ID from JWT
    //   const id = res.locals.jwtPayload.userId;
    //   //Get parameters from the body
    //   const { oldPassword, newPassword } = req.body;
    //   if (!(oldPassword && newPassword)) {
    //     res.status(400).send();
    //   }
    //   //Get user from the database
    //   const userRepository = getRepository(User);
    //   let user: User;
    //   try {
    //     user = await userRepository.findOneOrFail(id);
    //   } catch (id) {
    //     res.status(401).send();
    //   }
    //   //Check if old password matchs
    //   if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
    //     res.status(401).send();
    //     return;
    //   }
    //   //Validate de model (password lenght)
    //   user.password = newPassword;
    //   const errors = await validate(user);
    //   if (errors.length > 0) {
    //     res.status(400).send(errors);
    //     return;
    //   }
    //   //Hash the new password and save
    //   user.hashPassword();
    //   userRepository.save(user);
    //   res.status(204).send();
  // };
}
