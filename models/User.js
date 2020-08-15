const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please enter a valid email']
    },
    password:{
        type: String,
        required:  [true, 'Please enter a password'],
        minlength: [6, 'min password lenght is 6 character']
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;

