const { isMoment } = require("moment/moment");
const mongoose = require("mongoose");
const constant = require("../../../config/constant");
let studentAttendanceSchema = new mongoose.Schema({









           userId: {
            type: mongoose.Schema.Types.ObjectId,
            required:false,
            default: null,
            ref: "Student_Profile"
        },
        name: {
            type: String,
            default: null
        },
        class_Name: {
            type: String,
            default: null,
            trim: true
        },
        classNo: {
            type: String,
            default: null,
            trim: true
        },
        attendance: {
            type: String,
            default: null
        },
        date: {
            type: Date,
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
        }
    },
    { timestamps: true })

let StudentAttendance = mongoose.model(constant.collections.studentAttendance, studentAttendanceSchema);
module.exports = { StudentAttendance }