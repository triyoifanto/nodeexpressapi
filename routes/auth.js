const express = require('express'),
router = express.Router(),
controller = require(__root + 'module/auth/authController');

router
    .post('/register', controller.RegisterUser)
    .post('/login', controller.Login)
    .post('/logout', controller.Logout)
    .get('/me', controller.GetUser);

module.exports = router;