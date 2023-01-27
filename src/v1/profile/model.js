// const mongoose = require("mongoose");
// const constant = require('../../../config/constant');
// const { User } = require("../authorization/model");

// let profileSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         unique: true,
//         default: null
//     },
//     email: {
//         type: String,
//         unique: true,
//         trim: true
//     },

//     firstName: {
//         type: String,
//         default: null,
//         trim: true
//     },
//     lastName: {
//         type: String,
//         default: null,
//         trim: true
//     },
//     fullName: {
//         type: String,
//         default: null

//     },
//     className: {
//         type: String,
//         default: null
//     },

//     dateOfBirth: {
//         type: String,
//         default: null,
//         unique: true,
//     },
//     mobileNo: {
//         type: String,
//         trim: true,
//         default: null,
//         unique: true,
//     },
//     rollNo: {
//         type: Number,
//         unique: true,
//         trim: true,
//         default: null
//     },
//     section: {
//         type: String,
//         required: true
//     },
//     gender: {
//         type: String,
//         default: null,
//     },
//     aadharNo: {
//         type: String,
//         default: null,

//     },
//     image: {
//         type: String,
//         default: null,

//     },
//     deleteAt: {
//         type: Date,
//         default: null,
//         select: false
//     },
//     deleteBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'user',
//         default: null,
//         select: false
//     },
//     updatedBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'user',
//         default: null
//     },
//     createdBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'user',

//         default: null
//     },
// }, { timestamps: true })




// let Profile = mongoose.model(constant.collections.profile, profileSchema);
// module.exports = { Profile }