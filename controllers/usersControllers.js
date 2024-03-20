import jwt from "jsonwebtoken";
import usersService from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../helpers/ctrlWrapper.js";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email } = req.body;
  const isEmail = await usersService.findUser({ email });

  if (isEmail) throw HttpError(409, "Email in use");

  const newUser = await usersService.signup(req.body);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
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
  const { email } = req.user;

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

export default {
  signup: controllerWrapper(signup),
  signin: controllerWrapper(signin),
  signout: controllerWrapper(signout),
  getCurrent: controllerWrapper(getCurrent),
  updateSubscription: controllerWrapper(updateSubscription),
};
