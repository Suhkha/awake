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

const hasRole = (...roles) => {
  return (req, res = response, next) => {
    //console.log(roles, req.user.role);

    if (!req.user) {
      return res
        .status(500)
        .json("Check the token first in order to validate the role");
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        message: `You need to have the following roles: ${roles}`,
      });
    }
    next();
  };
};

module.exports = {
  validateAdminRole,
  hasRole,
};
