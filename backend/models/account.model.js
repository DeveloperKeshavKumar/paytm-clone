const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true,
        default:0.00
    }
});

module.exports = mongoose.model('account', accountSchema);