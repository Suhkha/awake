const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { uploadFile } = require("../helpers");
const { User, Product } = require("../models");

const uploadFiles = async (req, res = response) => {
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

const updateFile = async (req, res = response) => {
  const { id, collection } = req.params;
  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);

      if (!model) {
        return res.status(400).json({
          message: "user id does not exists",
        });
      }
      break;

    case "products":
      model = await Product.findById(id);

      if (!model) {
        return res.status(400).json({
          message: "product id does not exists",
        });
      }
      break;

    default:
      return res.status(500).json({ message: "wrong collection" });
  }

  try {
    if (model.image) {
      const imagePath = path.join(
        __dirname,
        "../uploads",
        collection,
        model.image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
  } catch (error) {}

  const name = await uploadFile(req.files, undefined, collection);
  model.image = name;

  await model.save();

  res.json({ model });
};

module.exports = {
  uploadFiles,
  updateFile,
};
