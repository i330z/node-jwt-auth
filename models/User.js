const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt')
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

// / fire a function before a doc is saved to db


userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

// fire a function after a doc is saved to db

// userSchema.post('save', function(doc, next){

//     next();
// })


// static function

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}


const User = mongoose.model('user', userSchema);

module.exports = User;

