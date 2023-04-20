const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.createUser =  async (request, response) => {
    const {fullname, email, password} = request.body;
    const isNewUser = await User.isThisEmailInUse(email)
    if(!isNewUser) return response.json({succes: false, message: "This email is already used"})
    const user = await User({
        fullname,
        email,
        password, 
    })
    await user.save();

    response.json(user)
}

exports.userSignIn = async (request, response) => {
    const {email, password} = request.body;
    const user = await User.findOne({email})
    if(!user) return response.json({success: false, message: 'user not found' })

    const isMatching = await user.comparePassword(password)
    if(!isMatching) return response.json({success: false, message: "password didn't match"})

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET,{expiresIn: '1d'})

    return response.json({success: true, user, token})
}

