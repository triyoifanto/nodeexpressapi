const mongoose = require('mongoose'),
userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    }
});

let user = mongoose.model('User', userSchema);

module.exports = user;