const User = require('../models/User');

// handle error
const handleErrors = (err) =>{
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };


    // duplicate error
    if(err.code === 11000){
        errors.email = 'Email is already registered';
    }

    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

module.exports.signup_get = (req, res) =>{
    res.render('signup')
}
module.exports.login_get = (req, res) =>{
    res.render('login')
}
module.exports.signup_post = async(req, res) =>{
    const { email, password } = req.body;
    
    try {
        const user = await User.create({email, password});
        res.status(201).json(user);
    } catch (error) {
        const error = handleErrors(error)
        res.status(400).json({error});
    }

}

module.exports.login_post = async(req, res) =>{
    const { email, password } = req.body;
    console.log(email, password);
}