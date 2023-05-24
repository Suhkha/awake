const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (
  files,
  validExtensions = ["png", "jpg", "jpeg", "gif"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const splitName = file.name.split(".");
    const extension = splitName[splitName.length - 1];

    if (!validExtensions.includes(extension)) {
      return reject(
        `Invalid extension ${extension}, please use one of this ${validExtensions}`
      );
    }

    const tmpFileName = uuidv4() + "." + extension;
    uploadPath = path.join(__dirname, "../uploads/", folder, tmpFileName);

    file.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(tmpFileName);
    });
  });
};

module.exports = {
  uploadFile,
};
