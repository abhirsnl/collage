const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const constant = require('../../../config/constant');


let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
        default: null
    },
    rollNo: {
        type: Number,
        unique: true,
        trim: true,
        default: null,
    },
    class_Name: {
        type: String,
        trim: true,
        default: null
    },

    roleId: {
        type: Number,
        required: true,
        default: constant.roleId.teacher
    },

    otp: {
        type: String,
        default: null
    },


    otpExpireAt: {
        type: Date,
        default: null
    },

    status: {
        type: String,
        default: null
    },
    otpVerified: {
        type: Boolean,
        default: false
    },

    deleteAt: {
        type: Date,
        default: null,
        select: false
    },
    deleteBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null,
        select: false
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: false,
        select: false
    },
}, { timestamps: true })


// Save email to lowercase and save password with encryption
userSchema.pre('save', async function (next) {
    const user = this
    user.email = user.email.toLowerCase() || user.email

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }

    next()
})

let User = mongoose.model(constant.collections.user, userSchema);
module.exports = { User }