import express from "express";
import groupsControllers from "../controllers/groupsControllers.js";
import validateBody from "../helpers/validateBody.js";
import groupsSchemas from "../schemas/groupsSchema.js";
import isValidId from "../middlewares/isValidId.js";

const groupsRouter = express.Router();
// додав колекцію groups для запам'ятовування і тренування з методом populate()
groupsRouter.get("/", groupsControllers.getAllGroups);

groupsRouter.get("/:id", isValidId, groupsControllers.getOneGroup);

groupsRouter.delete("/:id", isValidId, groupsControllers.deleteGroup);

groupsRouter.post(
  "/",
  validateBody(groupsSchemas.createGroupSchema),
  groupsControllers.createGroup
);

groupsRouter.put(
  "/:id",
  isValidId,
  validateBody(groupsSchemas.updateGroupSchema),
  groupsControllers.updateGroup
);

export default groupsRouter;
