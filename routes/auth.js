const express = require('express'),
router = express.Router(),
controller = require(__root + 'module/auth/authController'),
userModel = require(__root + 'module/user/userModel');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     name: Register
 *     summary: Register a new user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/User'
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - name
 *           - email
 *           - password
 *     responses:
 *       '200':
 *         description: User registered successfully
 *       '401':
 *         description: Bad username, not found in db
 *       '500':
 *         description: There was an error when registering the user.
 */
router.post('/register', controller.RegisterUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     name: Login
 *     summary: Logs in a user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - email
 *           - password
 *     responses:
 *       '200':
 *         description: User found and logged in successfully
 *       '401':
 *         description: Bad email, not found in db
 *       '500':
 *         description: Error on the server
 */
router.post('/login', controller.Login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     name: Logout
 *     summary: Logout a user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters: []
 *     responses:
 *       '200':
 *         description: User logged out successfully
 */
router.post('/logout', controller.Logout);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     name: Get Current user based on tha e token
 *     summary: Get Current user based on tha e token
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         schema:
 *          type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: Get User info on token payload successfully * 
 *       '401':
 *         description: No token sent.
 *       '500':
 *         description: failed to authenticate token * 
 *     security:
 */
router.get('/me', controller.GetUser);

module.exports = router;

