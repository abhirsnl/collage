
const { User } = require("../authorization/model")
const serviceResponse = require("../helper/serviceResponse")
const { Student_Profile } = require("../students/profile/model")
const { StudentAttendance } = require("./model")
const addStudents = async (req, res) => {
    try {
        const { userId } = req
        const { class_Name, attendance } = req.body
        const students = await Student_Profile.find({ class_Name: class_Name })
        if (!students || !students.length) {
            return res.status(200).send(new serviceResponse({ status: 404, errors: [{ message: "Class name not found" }] }))
        }
        const addedStudent = [];
        const updatedStudent = [];
        for (const student of students) {
            const existingAttendance = await StudentAttendance.findOne({
                userId: student.userId,
                date: { $gte: new Date().setHours(0, 0, 0, 0), $lt: new Date().setHours(23, 59, 59, 999) },
            });
            if (!existingAttendance) {
                const newAttendance = new StudentAttendance({
                    userId: student.userId,
                    createdBy: userId,
                    name: `${student.firstName} ${student.lastName}`,
                    class_Name: class_Name,
                    attendance: attendance,
                    date: new Date()
                });
                addedStudent.push(newAttendance);
            } else {
                existingAttendance.attendance = attendance;
                existingAttendance.updatedBy = userId
                updatedStudent.push(existingAttendance);
            }
        }
        if (addedStudent.length>0) {
            await StudentAttendance.insertMany(addedStudent)
            return res.status(200).send(new serviceResponse({ status: 200, data: addedStudent, message: "Attendance added successfully" }))
        }
        else if (!addedStudent.length && !updatedStudent.length) {
            res.status(200).send(new serviceResponse({ status: 200, message: "All students already have attendance marked for today" }))
        }
        else {
            await StudentAttendance.updateMany({ userId: { $in: updatedStudent.map(student => student.userId) } }, { $set: [{ attendance: attendance }, { updatedBy: userId }] })
            return res.status(200).send(new serviceResponse({ status: 200, data: updatedStudent, message: "Attendance updated successfully" }))
        }
    } catch (error) {
        return res.status(500).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
    }
}
const autoAttedance= async(req,res)=>{
    try {
        const students = await Student_Profile.find({});
        const attendanceRecords = students.map(student => ({
          userId: student.userId,
          attendance: 'p',
          class_Name:student.class_Name,
          name:student.firstName
        }));
        await StudentAttendance.insertMany(attendanceRecords);
        console.log('Attendance updated successfully');
      } catch (error) {
        console.error(error.message);
      }
    };

const removeAttendance = async (req, res) => {
    try {
        const { userId, class_Name, name } = req.params;
        const studentExist = await StudentAttendance.findOneAndRemove({ userId: userId })
        if (!studentExist) {
            return res.send(new serviceResponse({ message: "user not fond" }))
        }
        return res.send(new serviceResponse({ data: studentExist }))
    } catch (error) {
        return res.status(500).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
    }
}
module.exports = {
    addStudents, removeAttendance,autoAttedance
}