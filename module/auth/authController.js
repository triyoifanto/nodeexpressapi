const mongoose = require('mongoose'),
userModel = mongoose.model('User'),
jwt = require('jsonwebtoken'),
bcrypt = require('bcryptjs'),
config = require(__root + 'config');
//userModel = require(__root + 'module/user/userModel')
const RegisterUser = (req, res) => {
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);
    req.body.password = hashedPassword;

    userModel.create(req.body, (err, user) => {
        if(err) return res.status(500).send("there was an error when registering the user.");
        
        // if user is registered without errors
        // create a token
        let token = jwt.sign(
            { 
                id: user._id,
                email: user.email
            }, // payload            config.secret,
            { expiresIn: 86400 }//expires in 24 hours
        );
        res.status(200).send({auth: true, token: token });
    });
},

Login = (req, res) => {
    userModel.findOne({ email: req.body.email }, (err, user) => {
        if(err) return res.status(500).send('Error on the server.');
        if(!user) return res.status(404).send('No user found.');
        
        // check if the password is valid
        let isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if(!isPasswordValid) return res.status(401).send({ auth: false, token: null });

        // if user is found and password is valid
        // create a token
        let token = jwt.sign(
            { id: user._id }, 
            config.secret,
            { expiresIn: 86400 }//expires in 1 minutes
        );

        // return the information including token as JSON
        res.status(200).send({auth: true, token: token });
    })
},

Logout = (req, res) => {
    res.status(200).send({ auth: false, token: null });
},

GetUser = (req, res) => {
    let token = req.headers['x-access-token'];
    if(!token) return res.status(401).send({
        auth: false,
        message: 'Failed to authenticate token.'
    });

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) return res.status(500).send({ 
            auth: false,
            message: 'failed to authenticate token ' + err.message
        });

        res.status(200).send(decoded);
    });
};

module.exports = { RegisterUser, Login, Logout, GetUser }
