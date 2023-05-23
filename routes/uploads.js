const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { uploadFiles } = require("../controllers/uploads");

const router = Router();

router.post("/", uploadFiles);

module.exports = router;
