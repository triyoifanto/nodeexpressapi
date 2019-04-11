const express = require('express'),
router = express.Router(),
controller = require(__root + 'module/user/userController'),
tokenVerificator = require(__root + 'module/auth/tokenVerificator');

router.use(tokenVerificator);

// CREATES A NEW USER
router.post('/', controller.Create);

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', controller.GetAll);

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', controller.GetById);

// DELETES A USER FROM THE DATABASE
router.delete('/:id', controller.Delete);

// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id', controller.Update);

module.exports = router;
