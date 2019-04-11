const userModel = require(__root + 'module/user/userModel'),
bcrypt = require('bcryptjs');

// CREATES A NEW USER
const Create = (req, res) => {
    userModel.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
},

// RETURNS ALL THE USERS IN THE DATABASE
GetAll = (req, res) => {
    userModel.find({}, (err, users) => {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
},

// GETS A SINGLE USER FROM THE DATABASE
GetById = (req, res) => {
    userModel.findById(req.params.id, (err, user) => {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
},

// DELETES A USER FROM THE DATABASE
Delete = (req, res) => {
    userModel.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
},

// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
Update = (req, res) => {
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);
    req.body.password = hashedPassword;

    userModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
};


module.exports = { Create, GetAll, GetById, Update, Delete };