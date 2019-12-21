"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = require("../controllers/UserController");
var shared_1 = require("../../../shared");
//import { checkJwt } from "../middlewares/checkJwt";
//import { checkRole } from "../middlewares/checkRole";
var router = express_1.Router();
router.get("/" + shared_1.RestAction.ALL, function (req, res) {
    UserController_1.UserController.getAll().then(function (result) {
        res.send(result);
    });
});
router.post("/" + shared_1.RestAction.GET, function (req, res) {
    UserController_1.UserController.get(req.body).then(function (result) {
        res.send(result);
    });
});
router.post("/" + shared_1.RestAction.INSERT, function (req, res) {
    UserController_1.UserController.insert(req.body);
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
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5yb3V0ZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9zcmMvcm91dGVzL3VzZXIucm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBaUM7QUFDakMsZ0VBQTZEO0FBQzdELDBDQUEwRDtBQUMxRCxxREFBcUQ7QUFDckQsdURBQXVEO0FBRXZELElBQU0sTUFBTSxHQUFHLGdCQUFNLEVBQUUsQ0FBQztBQUV4QixNQUFNLENBQUMsR0FBRyxDQUFDLE1BQUksbUJBQVUsQ0FBQyxHQUFLLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRztJQUN4QywrQkFBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07UUFDakMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFJLG1CQUFVLENBQUMsR0FBSyxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7SUFDekMsK0JBQWMsQ0FBQyxHQUFHLENBQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07UUFDNUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFJLG1CQUFVLENBQUMsTUFBUSxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7SUFDNUMsK0JBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDdkIsQ0FBQyxDQUFDLENBQUM7QUFFSCxlQUFlO0FBQ2YsNEVBQTRFO0FBRTVFLHNDQUFzQztBQUN0QywyQ0FBMkM7QUFDM0Msd0JBQXdCO0FBQ3hCLFFBQVE7QUFDUixNQUFNO0FBRU47Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXdCRTtBQUVGLGtCQUFlLE1BQU0sQ0FBQyJ9