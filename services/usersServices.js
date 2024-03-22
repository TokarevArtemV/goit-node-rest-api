import bcrypt from "bcrypt";

import User from "../models/User.js";

const findUser = (email) => User.findOne(email);

const signup = async (data) => {
  const hashPass = await bcrypt.hash(data.password, 10);

  return User.create({ ...data, password: hashPass });
};

const updateUser = async (filter, data) => User.findOneAndUpdate(filter, data);

const validatePassword = async (password, hashPassword) =>
  bcrypt.compare(password, hashPassword);

const deleteUsers = async (filter) => User.deleteMany(filter);

export default {
  signup,
  findUser,
  updateUser,
  validatePassword,
  deleteUsers,
};
