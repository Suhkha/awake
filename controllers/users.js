const { response } = require("express");

const usersGet = (req, res = response) => {
  const { q, name = "no name", lastname } = req.query;

  res.json({
    message: "get users",
    q,
    name,
    lastname,
  });
};

const usersPost = (req, res = response) => {
  const { name, bias } = req.body;

  res.json({
    message: "post users",
    name,
    bias,
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
