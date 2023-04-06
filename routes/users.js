const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { isValidRole, isValidEmail } = require("../helpers/db-validators");

const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);

router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("password", "password needs at least 6 characters")
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
    check("email", "not valid").isEmail().custom(isValidEmail),
    //check("role", "is not a valid role").isIn(["ADMIN", "USER"]),
    check("role").custom(isValidRole),
    validateFields,
  ],
  usersPost
);

router.put("/:id", usersPut);

router.delete("/", usersDelete);

module.exports = router;
