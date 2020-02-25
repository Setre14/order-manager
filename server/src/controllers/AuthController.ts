import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { validate } from 'class-validator';
import { MongoDB } from '../mongodb';
import { UserController } from './UserController';
import { User } from '../../../shared';
import * as bcrypt from 'bcryptjs';


// import config from "../config/config";


export class AuthController extends MongoDB {
  static COLLECTION_NAME = 'comment';
  static INDEX = ['name'];

  static async login(req: Request, res: Response): Promise<string> {
      let { username, password } = req.body;

      const users = await UserController.get<User>({ username: username });

      if (users.length == 0) {
        return '';
      }
    
      const user = User.fromJson(users[0]);
      
      if (!bcrypt.compareSync(password, user.password)) {
        return '';
      }

      const token = jwt.sign(
        { userId: user._id, username: user.username },
        'test',
        { expiresIn: "30d" }
      );

      return token;
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
