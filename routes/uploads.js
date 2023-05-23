const { Router } = require("express");
const { check } = require("express-validator");
const { allowedCollections } = require("../helpers");
const { validateFields, validateFile } = require("../middlewares");
const { uploadFiles, updateFile, getFile } = require("../controllers/uploads");

const router = Router();

router.post("/", uploadFiles, validateFile);

router.put(
  "/:collection/:id",
  [
    validateFile,
    check("id", "Invalid Mongo ID").isMongoId(),
    check("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    validateFields,
  ],
  updateFile
);

router.get(
  "/:collection/:id",
  [
    check("id", "Invalid Mongo ID").isMongoId(),
    check("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    validateFields,
  ],
  getFile
);

module.exports = router;
