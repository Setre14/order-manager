import { Router } from "express";
import {UserController} from "../controllers/UserController";
//import { checkJwt } from "../middlewares/checkJwt";
//import { checkRole } from "../middlewares/checkRole";

const router = Router();

router.get("/all", (req, res) => {
  UserController.getAll().then(result => {
    res.send(result);
  });
});

router.post("/insert", (req, res) => {
  UserController.insert(req.body);
  res.send('Inserted');
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
  UserController.deleteUser
);
*/

export default router;
