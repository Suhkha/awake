const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { uploadFile, validateCollection } = require("../helpers");
const { User, Product } = require("../models");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

/**
 * Only for local env
 */
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

/**
 * Only for local env
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

  const name = await uploadFile(req.files, undefined, collection);
  model.image = name;

  await model.save();

  res.json({ model });
};
*/

/** 
 * Only for local env

const getFile = async (req, res = response) => {
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

  if (model.image) {
    const imagePath = path.join(
      __dirname,
      "../uploads",
      collection,
      model.image
    );

    if (fs.existsSync(imagePath)) {
      return res.sendFile(imagePath);
    }
  }

  const placeholder = path.join(__dirname, "../assets/placeholder-bts.jpg");
  return res.sendFile(placeholder);
};
 */

const updateFileWithCloudinary = async (req, res = response) => {
  const { id, collection } = req.params;
  const model = await validateCollection(id, collection);

  if (model.image) {
    const splitName = model.image.split("/");
    const name = splitName[splitName.length - 1];

    const [public_id] = name.split(".");
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  model.image = secure_url;
  await model.save();

  res.json({ model });
};

const getFile = async (req, res = response) => {
  const { id, collection } = req.params;
  const model = await validateCollection(id, collection);

  if (model.image) {
    res.send(model.image);
  }
  const placeholder = path.join(__dirname, "../assets/placeholder-bts.jpg");
  return res.sendFile(placeholder);
};
module.exports = {
  uploadFiles,
  updateFileWithCloudinary,
  getFile,
};
