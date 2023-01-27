const mongoose = require("mongoose");
const constant = require("../../../../config/constant");


let student_profileSchema = new mongoose.Schema({
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
    fullName: {
        type: String,
        default: null

    },
    class_Name: {
        type: String,
        default: null
    },

    dateOfBirth: {
        type: String,
        default: null,
        unique: true,
    },
    mobile_No: {
        type: String,
        trim: true,
        default: null,
        unique: true,
    },
    roll_No: {
        type: Number,
        unique: true,
        trim: true,
        default: null
    },
    section: {
        type: String,
        required: true
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




let Student_Profile = mongoose.model(constant.collections.student_profile, student_profileSchema);
module.exports = { Student_Profile }