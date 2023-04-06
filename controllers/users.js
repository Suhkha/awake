const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const usersGet = (req, res = response) => {
  const { q, name = "no name", lastname } = req.query;

  res.json({
    message: "get users",
    q,
    name,
    lastname,
  });
};

const usersPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({
    user,
  });
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...userData } = req.body;

  if (password) {
    //encrypt password
    const salt = bcryptjs.genSaltSync();
    userData.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, userData);

  res.json({
    user,
  });
};

const usersDelete = (req, res = response) => {
  res.json({
    message: "delete users",
  });
};
module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
};
