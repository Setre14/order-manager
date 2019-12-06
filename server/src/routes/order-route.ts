
import { Router } from "express";

const router = Router();

function test() {
    return "test"
}

router.get("/test", (req, res) => {
    return res.send(test());
  });

// //Login route
// router.post("/login", AuthController.login);

// //Change my password
// router.post("/change-password", [checkJwt], AuthController.changePassword);

export default router;