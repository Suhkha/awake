const { response } = require("express");

const search = (req, res = response) => {
  res.json({
    message: "Busqueda",
  });
};

module.exports = {
  search,
};
