const {check, validationResult} = require('express-validator');

exports.validateUserSignUp = [    
    check('fullname')
    .trim()
    .not().isEmpty().withMessage('Name is required!')
    .isString().withMessage('Must be a valid name!')
    .isLength({min: 3, max: 25}).withMessage('Name must be between 3-25 characters!'),

    check('email')
    .normalizeEmail()
    .isEmail().withMessage('Invalid Email'),   

    check('password')
    .trim()
    .not().isEmpty().withMessage('Password must not be empty!')
    .isLength({min: 6, max: 20}).withMessage('Password must be between 6-20 characters!'),

    // check('confirmPassword')
    // .trim()
    // .not().isEmpty()
    // .custom((value, {request}) => {
    //     if(value !== request.body.password){
    //         throw new Error("Both passwords must be the same!")
    //     }
    //     return true;
    // }).withMessage("Passwords didn't match")
];

exports.userValidation = (request, response, next) => {
    const result = validationResult(request).array()
    if(!result.length) return next();

    const error = result [0].msg;
    response.json({success: false, message: error});
}

exports.validateUserSignIn = [
    check('email').trim().isEmail().withMessage('email / password is required'),
    check('password').trim().not().isEmpty().withMessage('emai / password is required')
]