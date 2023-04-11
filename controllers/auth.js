const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

    // JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something wrong",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, picture, email } = await googleVerify(id_token);
    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: "googleauth",
        picture,
        google: true,
        role: "USER",
      };

      user = new User(data);
      await user.save();
    }

    if (!user.status) {
      return res.status(401).json({
        message: "Inactive user",
      });
    }

    // JWT
    console.log(user.id);
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid token..",
    });
  }
};
module.exports = {
  login,
  googleSignIn,
};
