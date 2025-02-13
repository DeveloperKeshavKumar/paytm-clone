const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.statics.createHash = async function (userPasswordInput) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(userPasswordInput, salt);
};

userSchema.methods.validatePassword = async function (userPasswordInput) {
    return await bcrypt.compare(userPasswordInput, this.password);
};

module.exports = mongoose.model('user', userSchema);