const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Check if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({
        message: "Something wrong with email or password --email",
      });
    }

    //Check if user is active in database
    if (!user.status) {
      return res.status(400).json({
        message: "Something wrong with email or password --status: false",
      });
    }

    //Validate password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(500).json({
        message: "Something wrong with email or password --password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something wrong",
    });
  }
};

module.exports = {
  login,
};
