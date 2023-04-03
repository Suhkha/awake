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

  //check if email exists

  //encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({
    user,
  });
};

const usersPut = (req, res = response) => {
  const { id } = req.params;

  res.json({
    message: "put users",
    id,
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
