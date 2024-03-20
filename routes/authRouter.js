import express from "express";
import usersControllers from "../controllers/usersControllers.js";
import usersSchemas from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(usersSchemas.userSignupSchema),
  usersControllers.signup
);

authRouter.post(
  "/login",
  validateBody(usersSchemas.userSigninSchema),
  usersControllers.signin
);

authRouter.patch(
  "/",
  authenticate,
  validateBody(usersSchemas.userUpdateSchema),
  usersControllers.updateSubscription
);

authRouter.post("/current", authenticate, usersControllers.getCurrent);

authRouter.post("/logout", authenticate, usersControllers.signout);

export default authRouter;
