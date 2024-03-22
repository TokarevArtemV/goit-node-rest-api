import Jimp from "jimp";
import HttpError from "../helpers/HttpError.js";

const resizeFile = async (req, res, next) => {
  const { path: pathAvatar } = req.file;

  Jimp.read(pathAvatar)
    .then((file) => {
      return file
        .contain(250, 250) // resize
        .write(pathAvatar); // save
    })
    .then((resizedFile) => {
      if (resizedFile) next();
    })
    .catch((err) => {
      next(HttpError(400, err.message));
    });
};

export default resizeFile;
