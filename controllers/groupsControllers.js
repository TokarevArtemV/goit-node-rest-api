import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../helpers/ctrlWrapper.js";
import groupsServices from "../services/groupsServices.js";

// додав колекцію groups для запам'ятовування і тренуівння з методом populate()

const getAllGroups = async (req, res) => {
  const groups = await groupsServices.listGroups();
  res.status(200).json(groups);
};

const getOneGroup = async (req, res) => {
  const { id } = req.params;
  const group = await groupsServices.getGroupById(id);

  if (!group) throw HttpError(404);

  res.status(200).json(group);
};

const deleteGroup = async (req, res) => {
  const { id } = req.params;
  const group = await groupsServices.removeGroup(id);

  if (!group) throw HttpError(404);

  res.status(200).json(group);
};

const createGroup = async (req, res) => {
  const group = await groupsServices.addGroup(req.body);

  res.status(201).json(group);
};

const updateGroup = async (req, res) => {
  const { id } = req.params;
  const group = await groupsServices.updateGroupBuId(id, req.body);

  if (!group) throw HttpError(404);

  res.status(200).json(group);
};

export default {
  getAllGroups: controllerWrapper(getAllGroups),
  getOneGroup: controllerWrapper(getOneGroup),
  deleteGroup: controllerWrapper(deleteGroup),
  createGroup: controllerWrapper(createGroup),
  updateGroup: controllerWrapper(updateGroup),
};
