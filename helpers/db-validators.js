const Role = require("../models/role");
const User = require("../models/user");

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

module.exports = {
  isValidRole,
  isValidEmail,
  isUserValidById,
};
