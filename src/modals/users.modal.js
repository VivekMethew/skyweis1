const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    userRef: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        default: null
    },
    mname: {
        type: String,
        default: null
    },
    lname: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: null
    },
    password: {
        type: String,
        default: null
    },
    avtar: {
        type: String,
        default: null
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

const UserModal = mongoose.model('Users', userSchema)

module.exports = UserModal