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

module.exports = {
  isValidRole,
  isValidEmail,
};
