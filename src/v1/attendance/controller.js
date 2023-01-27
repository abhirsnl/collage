// const { ObjectId } = require("bson");
// const constant = require("../../../config/constant");
// const { User } = require("../authorization/model");
// const serviceResponse = require("../helper/serviceResponse");
// const { Profile } = require("../profile/model");

// const { StudentAttendance } = require("./model");


// const studentAttendanceAdd = async (req, res) => {
//     try {
//         const { userId, className } = req.body;
//         const user = await User.findOne({ _id: userId });
//         if (!user) {
//             return res.send(new serviceResponse({ status: 400, errors: [{ message: "User is not fond " }] }))
//         }
         
//             const checkStudent = await StudentAttendance.findOne({ className})
//             if (!checkStudent) {
                
       
               
//             if (checkStudent.students.includes(userId)){
//             return res.send(new serviceResponse({ status: 400, message: "Student allready exists " }));
//             }
//             checkStudent.students.push(userId)
//             await checkStudent.save()  
//             return res.send(new serviceResponse({data:checkStudent, message:"Student added successfully"}))
        
//         }
//     } catch (error) {
//         return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message:`${error.message}` }] }));
//     }
// }; 

// //     try {
// //         const { userId } = req.body;
// //         const date = new Date();
// //         const user = await User.findById(userId);
// //         if (!user) {
// //             return res.status(200).send(new serviceResponse({status:404, errors:[{message:"User not found"}]}));
// //         }
// //         const attendance = new StudentAttendance({ date, present: [userId], name: user.name, roll_no: user.roll_no, class: user.class, section: user.section });
// //         await attendance.save();
// //         return res.status(200).send(new serviceResponse({status:200, data:attendance}));
// //     } catch (error) {
// //         return res.status(200).send(new serviceResponse({status:500, errors:[{message:error}]}));
// //     }
// // };
// // const user = await Profile.aggregate([
// //     {
// //         $match: { userId: ObjectId(userId) }
// //     },
// //     {
// //         $lookup: {
// //             from: 'profiles',
// //             localField: 'userId',
// //             foreignField: 'userId',
// //             as: 'profiles'
// //         },


// //     },
// //     {
// //     $lookup: {
// //         from: 'educations',
// //         localField: 'userId',
// //         foreignField: "userId",
// //         as: 'education'
// //     },
// // },
// //     {
// //         $unwind: { path: '$profiles', preserveNullAndEmptyArrays: true }
// //     },
// //     // {
// //     //     $project: { studentName: { $concat: ['$firstName', " ", '$lastName'] } }
// //     // }




// // ]);












// //     return res.send(new serviceResponse({ status: 200, data: user, message: "Student record added successfully" }))
// // }

// // } catch (error) {
// //     return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))

// // }
// // }
// const studentAttendanceGet = async (req, res) => {
//     try {

//         const { studentUserId, rollNo, studentName } = req.body;
//         const student = await StudentAttendance.findOne({ rollNo, studentName });
//         if (!student) {
//             return res.send(new serviceResponse({ status: 400, errors: [{ message: "student does not exist" }] }))
//         }

//         return res.send(new serviceResponse({ status: 200, data: student, message: "Student record added successfully" }))


//     } catch (error) {
//         return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))

//     }
// }
// const studentAttendanceUpdate = async (req, res) => {
//     try {
//         const { userId } = req
//         const { studentUserId, rollNo, studentName, id } = req.body;
//         const student = await StudentAttendance.findOne({ studentUserId });
//         if (!student) {
//             return res.send(new serviceResponse({ status: 400, errors: [{ message: "student does not exist" }] }))
//         }
//         req.body.updatedBy = userId

//         const updateStudent = await StudentAttendance.updateOne({ ...req.body })

//         return res.send(new serviceResponse({ status: 200, data: updateStudent, message: "Student record updated successfully" }))


//     } catch (error) {
//         return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))

//     }
// }
// module.exports = {
//     studentAttendanceAdd, studentAttendanceGet, studentAttendanceUpdate
// }