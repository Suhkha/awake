const { Role, User, Category, Product } = require("../models");

const isValidRole = async (role = "") => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole) {
    throw new Error(`The role ${role} does not exist`);
  }
};

const isValidEmail = async (email = "") => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`Email already ${email} exists`);
  }
};

const isUserValidById = async (id) => {
  const existUserId = await User.findById(id);

  if (!existUserId) {
    throw new Error("User ID does not exists");
  }
};

const isCategoryValidById = async (id) => {
  const existCategoryId = await Category.findById(id);

  if (!existCategoryId) {
    throw new Error("Category ID does not exists");
  }
};

const isProductValidById = async (id) => {
  const existProductId = await Product.findById(id);

  if (!existProductId) {
    throw new Error("Product ID does not exists");
  }
};

const allowedCollections = (collection = "", collections = []) => {
  const existCollection = collections.includes(collection);

  if (!existCollection) {
    throw new Error("Wrong collection");
  }

  return true;
};

const validateCollection = async (id, collection) => {
  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);

      if (!model) {
        throw new Error("user id does not exists");
      }

      break;

    case "products":
      model = await Product.findById(id);

      if (!model) {
        throw new Error("product id does not exists");
      }
      break;

    default:
      throw new Error("wrong collection");
  }

  return model;
};

module.exports = {
  isValidRole,
  isValidEmail,
  isUserValidById,
  isCategoryValidById,
  isProductValidById,
  allowedCollections,
  validateCollection,
};
