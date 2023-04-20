const express = require('express');

const router = express.Router();
const{createUser, userSignIn} = require('../controllers/user');
const { isAuth } = require('../middlewares/auth');
const { validateUserSignUp, validateUserSignIn, userValidation } = require('../middlewares/validation/user');

router.post('/create-user' ,validateUserSignUp ,userValidation , createUser)
router.post('/sign-in', validateUserSignIn, userValidation ,userSignIn)

router.post('/create-post', isAuth, (request, response) => {
    response.send('Post creation authorized'); 
})



module.exports = router;