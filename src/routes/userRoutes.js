const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const validate = require("../middleware/validate");
const { createUserSchema, loginUserSchema } = require("../validator/userValidator");

router.post("/login", validate(loginUserSchema), userController.loginUser);
router.post("/register", validate(createUserSchema), userController.registerUser);

module.exports = router;
