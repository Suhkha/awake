const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields, validateJWT } = require("../middlewares");
const { isCategoryValidById } = require("../helpers/db-validators");
const {
  categoriesGet,
  categoryByIdGet,
  categoryPost,
  categoryPut,
  categoryDelete,
} = require("../controllers/categories");

const router = Router();
//-- PUBLIC
router.get("/", categoriesGet);

//-- PUBLIC
router.get(
  "/:id",
  [
    check("id", "Invalid Mongo ID").isMongoId(),
    check("id").custom(isCategoryValidById),
  ],
  categoryByIdGet
);

//-- PRIVATE - ONLY USERS WITH TOKEN ID
router.post(
  "/",
  [
    validateJWT,
    check("name", "name is required").not().isEmpty(),
    validateFields,
  ],
  categoryPost
);

//-- PRIVATE - ONLY USERS WITH TOKEN ID
router.put(
  "/:id",
  [
    check("id", "Invalid Mongo ID").isMongoId(),
    check("id").custom(isCategoryValidById),
    validateJWT,
  ],
  categoryPut
);

//-- PRIVATE - ONLY USERS WITH TOKEN ID - CHANGE STATE NOT DELETE
router.delete(
  "/:id",
  [
    check("id", "Invalid Mongo ID").isMongoId(),
    check("id").custom(isCategoryValidById),
    validateJWT,
  ],
  categoryDelete
);

module.exports = router;
