const { response } = require('express');
const express = require('express');
require('dotenv').config()
require('./models/db');
const app = express();
const User = require('./models/user')

app.post('/create-user', async (request, response) => {
    // const isNewUser = await User.isThisEmailInUse()
    // if(!isNewUser) return response.json({succes: false, message: "This email is already used"})
    // const user = await User({
    //     fullname: 'John Doe',
    //     email: 'johnDoe@test.com',
    //     password: "password"
    // })
    // await user.save();
    // response.json(user)
})

app.get('/', (request, response) => {

})

app.listen(8000, () => {
    console.log('port is listening');
})