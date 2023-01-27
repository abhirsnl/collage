// const { isMoment } = require("moment/moment");
// const mongoose = require("mongoose");
// const constant = require("../../../config/constant");

// let studentAttendanceSchema = new mongoose.Schema({
   
//     students: {
//         type: [mongoose.Schema.Types.ObjectId],
//         ref: 'User',
//         required: true,
//         default:[]
//     ,className: {
//         type: [String],
//         required: true,
//         default:[]
//     }},
   

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
//         required: false,
//         select: false
//     },
// })

// let StudentAttendance = mongoose.model(constant.collections.studentAttendance, studentAttendanceSchema);
// module.exports = { StudentAttendance }