const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares");

//-- PUBLIC
router.get("/", categoriesGet);

//-- PUBLIC
router.get("/:id", categoriesByIdGet);

//-- PRIVATE - ONLY USERS WITH TOKEN ID
router.post("/", categoryPost);

//-- PRIVATE - ONLY USERS WITH TOKEN ID
router.put("/:id", categoryPut);

//-- PRIVATE - ONLY USERS WITH TOKEN ID - CHANGE STATE NOT DELETE
router.delete("/:id", categoryDelete);

const router = Router();

module.exports = router;
