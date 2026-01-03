const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const validate = require("../middleware/validate");
const { createUserSchema, loginUserSchema } = require("../validator/userValidator");

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Register user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/login", validate(loginUserSchema), userController.loginUser);

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.post("/register", validate(createUserSchema), userController.registerUser);

module.exports = router;
