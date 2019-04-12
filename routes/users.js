const express = require('express'),
router = express.Router(),
controller = require(__root + 'module/user/userController'),
tokenVerificator = require(__root + 'module/auth/tokenVerificator');

router.use(tokenVerificator);

// CREATES A NEW USER
/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     name: Create
 *     summary: Create a new user
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
 *         description: User created successfully
 *         schema:
 *          $ref: "#/definitions/User"
 *       '401':
 *         description: Bad username, not found in db
 *       '500':
 *         description: There was a problem adding the information to the database.
 *     security:
 *      - auth: []
 */
router.post('/', controller.Create);

// RETURNS ALL THE USERS IN THE DATABASE
/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     name: Get All
 *     summary: Get users
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: User retrieved successfully
 *         schema:
 *           type: array
 *           items:
 *              $ref: "#/definitions/User"
 *       '401':
 *         description: Bad username, not found in db
 *       '500':
 *         description: There was a problem finding the users.
 */
router.get('/', controller.GetAll);

// GETS A SINGLE USER FROM THE DATABASE
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     name: Get By Id
 *     summary: Get a user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *          type: integer
 *         required: true
 *         decsription: numeric id of the user to get
 *     responses:
 *       '200':
 *         description: User retrieved successfully
 *         chema:
 *           $ref: "#/definitions/User"
 *       '401':
 *         description: Bad username, not found in db
 *       '500':
 *         description: There was a problem finding the users.
 */
router.get('/:id', controller.GetById);

// DELETES A USER FROM THE DATABASE
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     name: Delete
 *     summary: Delete a user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: integer
 *         required: true
 *         decsription: numeric id of the user to get
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '401':
 *         description: Bad username, not found in db
 *       '500':
 *         description: There was a problem finding the users.
 */
router.delete('/:id', controller.Delete);

// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
// DELETES A USER FROM THE DATABASE
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     name: Update
 *     summary: Update a user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: integer
 *         required: true
 *         decsription: numeric id of the user to get
 *       - name: body
 *         in: body
 *         schema:
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
 *         description: User updated successfully
 *         schema:
 *           $ref: "#/definitions/User"
 *       '401':
 *         description: Bad username, not found in db
 *       '500':
 *         description: There was a problem finding the users.
 */
router.put('/:id', controller.Update);

module.exports = router;
