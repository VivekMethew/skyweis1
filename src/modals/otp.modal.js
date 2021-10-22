const mongoose = require('mongoose');
const Schema = mongoose.Schema

const otpSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    verifyStatus: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Date,
        default: null
    },
    status: {
        type: Number,
        default: 1
    },
}, {
    timestamps: true
})

const OtpModal = mongoose.model('Otp', otpSchema)

module.exports = OtpModal