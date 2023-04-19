
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

