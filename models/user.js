const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: Buffer,
    
});

userSchema.statics.isThisEmailInUse = async function(email) {

    if(!email) throw new Error("Invalid email")

    try {
        const user = await this.findOne({email})
        if (user) return false;
        
        return true;

    } catch (error) {
        console.log("error inside isThisEmailInUse()", error.message);
    }
}

module.exports = mongoose.model('User', userSchema);