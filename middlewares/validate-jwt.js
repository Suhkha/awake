const { response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json("There is not token.");
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETKEY);

    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json("Invalid token --user does not exist");
    }

    //check if user active
    if (!user.status) {
      return res.status(401).json("Invalid token --user inactive");
    }
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = {
  validateJWT,
};
