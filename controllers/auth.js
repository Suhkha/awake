const { response } = require("express");

const login = (req, res = response) => {
  res.json({
    message: "login",
  });
};

module.exports = {
  login,
};
