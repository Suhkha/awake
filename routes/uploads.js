const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { uploadFiles, updateFile } = require("../controllers/uploads");
const { allowedCollections } = require("../helpers");

const router = Router();

router.post("/", uploadFiles);

router.put(
  "/:collection/:id",
  [
    check("id", "Invalid Mongo ID").isMongoId(),
    check("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    validateFields,
  ],
  updateFile
);

module.exports = router;
