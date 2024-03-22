import * as fs from "fs/promises";
import path from "path";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";

import usersService from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../helpers/ctrlWrapper.js";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email } = req.body;
  const isEmail = await usersService.findUser({ email });

  if (isEmail) throw HttpError(409, "Email in use");

  const avatarUrl = gravatar.url(email, { r: "pg" }, true);
  const newUser = await usersService.signup({ ...req.body, avatarUrl });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatarUrl: newUser.avatarUrl,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await usersService.findUser({ email });

  if (!user) throw HttpError(401, "Email or password invalid");

  const comparePass = await usersService.validatePassword(
    password,
    user.password
  );

  if (!comparePass) throw HttpError(401, "Email or password invalid");

  const { _id: id } = user;
  const payload = { id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await usersService.updateUser({ _id: id }, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const signout = async (req, res) => {
  const { _id: id } = req.user;

  await usersService.updateUser({ _id: id }, { token: "" });

  res.status(204).json();
};

const updateSubscription = async (req, res) => {
  const { _id: id } = req.user;
  const { subscription } = req.body;

  const user = await usersService.updateUser({ _id: id }, { subscription });

  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

const updateAvatar = async (req, res) => {
  const { _id: id } = req.user;

  const avatarPath = path.resolve("public", "avatars");

  const { path: oldPathAvatar, filename } = req.file;

  const newPathAvatar = path.join(avatarPath, filename);

  await fs.rename(oldPathAvatar, newPathAvatar);
  const avatarUrl = path.join("avatars", filename);

  const user = await usersService.updateUser({ _id: id }, { avatarUrl });

  res.status(200).json({
    avatarUrl: user.avatarUrl,
  });
};

export default {
  signup: controllerWrapper(signup),
  signin: controllerWrapper(signin),
  signout: controllerWrapper(signout),
  getCurrent: controllerWrapper(getCurrent),
  updateSubscription: controllerWrapper(updateSubscription),
  updateAvatar: controllerWrapper(updateAvatar),
};
