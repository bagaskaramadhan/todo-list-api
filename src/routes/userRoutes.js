const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const validate = require("../middleware/validate");
const { createUserSchema } = require("../validator/userValidator");

router.post("/user", validate(createUserSchema), userController.createUser);

module.exports = router;
