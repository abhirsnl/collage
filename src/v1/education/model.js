
const mongoose = require('mongoose');
const constant = require('../../../config/constant');

let educationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    qualification: {
        type: String,
        default: null,
        trim: true
    },

    board: {
        type: String,
        default: null
    },
    passingYear: {
        type: Number,
        default: null,
        trim: true
    },

    institute: {
        type: String,
        default: null
    },
    percentage: {
        type: String,
        default: null
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




let Education = mongoose.model(constant.collections.education, educationSchema);
module.exports = { Education }