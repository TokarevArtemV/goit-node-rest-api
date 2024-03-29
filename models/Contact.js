import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "group",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", setUpdateSettings);
contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);

export default Contact;
