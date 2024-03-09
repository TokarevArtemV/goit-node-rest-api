import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

const groupSchemas = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name of group"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

groupSchemas.post("save", handleSaveError);

groupSchemas.pre("findOneAndUpdate", setUpdateSettings);
groupSchemas.post("findOneAndUpdate", handleSaveError);

const Group = model("group", groupSchemas);

export default Group;
