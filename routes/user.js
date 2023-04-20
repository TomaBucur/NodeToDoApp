const express = require('express');
const User = require('../models/user')

const router = express.Router();
const{createUser, userSignIn} = require('../controllers/user');
const { isAuth } = require('../middlewares/auth');
const { validateUserSignUp, validateUserSignIn, userValidation } = require('../middlewares/validation/user');

const multer = require('multer');
const sharp = require('sharp');
const storage = multer.memoryStorage();
const filefilter = (request, file, callBack) => {
    if(file.mimetype.startsWith('image')){
        callBack(null, true);
    }else[
        callBack('invalid image type!', false)
    ]
}
const uploads = multer({storage, filefilter});

router.post('/create-user' ,validateUserSignUp ,userValidation , createUser)
router.post('/sign-in', validateUserSignIn, userValidation ,userSignIn)

router.post('/upload-profile', isAuth, uploads.single('profile'), async (request, response) => {
    const {user} = request
    if(!user) return response.status(401).json({success: false, message: "Unauthorize access"})

    try {
        const profileBuffer = request.file.buffer
        if(!profileBuffer) throw new Error('File buffer is empty')

        const metadata = await sharp(profileBuffer).metadata()
        if(!metadata.width || !metadata.height) throw new Error('Invalid image format')

        const {width, height} = metadata
        const finalProfileImage = await sharp(profileBuffer).resize(Math.round(width * 0.5), Math.round(height * 0.5)).toBuffer();
    
        await User.findByIdAndUpdate(user._id, {avatar: finalProfileImage})
        response.status(201).json({success: true, message: 'Avatar updated'})
    } catch (error) {
        response.status(500).json({success: false, message: 'Server Error trying to uploading Avatar '})
        console.log('Error while updating profile image' ,error.message)
    }
})




module.exports = router;