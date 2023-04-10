const { response } = require("express");

const validateAdminRole = (req, res = response, next) => {
  if (!req.user) {
    return res
      .status(500)
      .json("Check the token first in order to validate the role");
  }

  const { role, name } = req.user;

  if (role !== "ADMIN") {
    res.status(401).json({
      message: `${name} is not ADMIN`,
    });
  }
  next();
};

module.exports = {
  validateAdminRole,
};
