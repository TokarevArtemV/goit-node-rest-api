import express from "express";
import usersControllers from "../controllers/usersControllers.js";
import usersSchemas from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";
import resizeFile from "../middlewares/resizeFile.js";

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
  "/subscription",
  authenticate,
  validateBody(usersSchemas.userUpdateSubscriptionSchema),
  usersControllers.updateSubscription
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatarUrl"),
  resizeFile,
  usersControllers.updateAvatar
);

authRouter.post("/current", authenticate, usersControllers.getCurrent);

authRouter.post("/logout", authenticate, usersControllers.signout);

export default authRouter;
