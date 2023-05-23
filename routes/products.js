const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields, validateJWT } = require("../middlewares");
const { isCategoryValidById, isProductValidById } = require("../helpers");

const {
  productsGet,
  productByIdGet,
  productPost,
  productPut,
  productDelete,
} = require("../controllers/products");

const router = Router();
//-- PUBLIC
router.get("/", productsGet);

//-- PUBLIC
router.get(
  "/:id",
  [
    check("id", "Invalid Mongo ID").isMongoId(),
    check("id").custom(isProductValidById),
    validateFields,
  ],
  productByIdGet
);

//-- PRIVATE - ONLY USERS WITH TOKEN ID
router.post(
  "/",
  [
    validateJWT,
    check("name", "name is required").not().isEmpty(),
    check("category", "Invalid Mongo ID").isMongoId(),
    check("category").custom(isCategoryValidById),
    validateFields,
  ],
  productPost
);

//-- PRIVATE - ONLY USERS WITH TOKEN ID
router.put(
  "/:id",
  [
    check("id", "Invalid Mongo ID").isMongoId(),
    check("id").custom(isProductValidById),
    check("category", "Invalid Mongo ID").isMongoId(),
    check("category").custom(isCategoryValidById),
    validateJWT,
    validateFields,
  ],
  productPut
);

//-- PRIVATE - ONLY USERS WITH TOKEN ID - CHANGE STATE NOT DELETE
router.delete(
  "/:id",
  [
    check("id", "Invalid Mongo ID").isMongoId(),
    check("id").custom(isProductValidById),
    validateJWT,
    validateFields,
  ],
  productDelete
);

module.exports = router;
