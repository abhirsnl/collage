const mongoose = require('mongoose');
const constant = require('../../../config/constant');
let addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true

    },
    addressType: {
        type: String,
        default: "Permanent",
    },
    houseNo: {
        type: String,
        default: null,
        trim: true

    },
    galiNo: {
        type: String,
        default: null,
        trim: true
    },
    city: {
        type: String,
        default: null,
        trim: true
    },
    district: {
        type: String,
        default: null,
        trim: true
    },
    state: {
        type: String,
        default: null,
        trim: true

    },
    pincode: {
        type: Number,
        default: null,
        trim: true

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




let Address = mongoose.model(constant.collections.address, addressSchema);
module.exports = { Address }