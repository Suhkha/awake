const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields, validateFile } = require("../middlewares");
const { uploadFiles, updateFile } = require("../controllers/uploads");
const { allowedCollections } = require("../helpers");

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

module.exports = router;
