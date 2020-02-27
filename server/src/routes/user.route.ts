import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { RestAction, User, Role } from '../../../shared';
import * as bcrypt from 'bcryptjs';

//import { checkJwt } from "../middlewares/checkJwt";
//import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get(`/${RestAction.ALL}`, (req, res) => {
  UserController.getAll().then(result => {
    res.send(result);
  });
});

router.post(`/${RestAction.GET}`, (req, res) => get(req, res));

async function get(req: any, res: any) {
  const user: User[] = await  UserController.get<User>(req.body);
  res.send(user);
}

// router.post(`/${RestAction.INSERT}`, (req, res) => {
//   UserController.insert(req.body);
//   res.send('Inserted');
// });

router.post(`/${RestAction.INSERT_OR_UPDATE}`, (req, res) => {
  const user: User = req.body;
  user.password = bcrypt.hashSync(user.password, 8);
  if (user.role == Role.ADMIN) {
    UserController.disable({ default: true })
  }
  UserController.insert(user);
  res.send('Inserted');
});

router.post(`/${RestAction.DISABLE}`, (req, res) => {
  UserController.disable(req.body);
  res.send();
});

//Get all users
//router.get("/", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);

// router.get("/test", (req, res) => {
//   UserController.test().then(result => {
//     res.send(result);
//   });
// });

/*
// Get one user
router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  UserController.getOneById
);

//Create a new user
router.post("/", [checkJwt, checkRole(["ADMIN"])], UserController.newUser);

//Edit one user
router.patch(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  UserController.editUser
);

//Delete one user
router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  UserController.disableUser
);
*/

export default router;
