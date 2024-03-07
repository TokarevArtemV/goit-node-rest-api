import Group from "../models/Groups.js";

const listGroups = () => Group.find();

const getGroupById = (id) => Group.findById(id);

const removeGroup = (id) => Group.findByIdAndDelete(id);

const addGroup = (data) => Group.create(data);

const updateGroupBuId = (id, data) => Group.findByIdAndUpdate(id, data);

export default {
  listGroups,
  getGroupById,
  removeGroup,
  addGroup,
  updateGroupBuId,
};
