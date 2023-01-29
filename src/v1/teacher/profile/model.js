const mongoose = require('mongoose');
const constant = require('../../../../config/constant')
let teacher_ProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        default: null
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },

    firstName: {
        type: String,
        default: null,
        trim: true
    },
    lastName: {
        type: String,
        default: null,
        trim: true
    },
    dateOfBirth: {
        type: String,
        default: null,
        unique: true,
    },
    mobileNo: {
        type: Number,
        trim: true,
        default: null,
        unique: true,
    },
    gender: {
        type: String,
        default: null,
    },
    aadhar_No: {
        type: String,
        default: null,

    },
    image: {
        type: String,
        default: null,

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
        default: null
    },
}, { timestamps: true })

let Teacher_Profile = mongoose.model(constant.collections.teacher_Profile, teacher_ProfileSchema)
module.exports = { Teacher_Profile };