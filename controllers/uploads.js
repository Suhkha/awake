const { response } = require("express");
const { uploadFile } = require("../helpers");

const uploadFiles = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({ message: "No files were uploaded." });
  }

  try {
    //const name = await uploadFile(req.files, ["txt", "md"], "texts");
    const name = await uploadFile(req.files, undefined, "bts");
    res.json({
      name,
    });
  } catch (message) {
    res.status(400).json({ message });
  }
};

module.exports = {
  uploadFiles,
};
