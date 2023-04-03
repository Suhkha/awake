const { response } = require("express");

const usersGet = (req, res = response) => {
  res.json({
    message: "get users",
  });
};

const usersPost = (req, res = response) => {
  res.json({
    message: "post users",
  });
};

const usersPut = (req, res = response) => {
  res.json({
    message: "put users",
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
