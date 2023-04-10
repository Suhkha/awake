const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json("There is not token.");
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETKEY);
    req.uid = uid;
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
