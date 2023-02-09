
const { User } = require("../authorization/model")
const serviceResponse = require("../helper/serviceResponse")
const { Student_Profile } = require("../students/profile/model")
const { Teacher_Profile } = require("../teacher/profile/model")
const { StudentAttendance } = require("./model")


// const addStudents = async (req, res) => {
//     try {
//         const { userId } = req.params
// const {class_Name}=req.body
// const teacher = await Teacher_Profile.findOne({userId:userId})
// if(!teacher)
// {
//     return res.send({message:"teacher not find"})
// }


//         const student = await Student_Profile.find({ class_Name:class_Name })
//         if (!student) {
//             return res.status(200).send(new serviceResponse({ status: 404, errors: [{ message: "Class name not fond" }] }))
//         }
//         else{
//             return res.status(200).send(new serviceResponse({ status: 200, data:student, message: "Class name not fond"  }))
//         }

//     } catch (error) {
//         return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
//     }
// }


const addStudents = async (req, res) => {
    try {
        const { userId } = req.params
        const { class_Name, attendance } = req.body
        const teacher = await Teacher_Profile.findOne({ userId: userId })
        if (!teacher) {
            return res.send({ message: "Teacher not found" })
        }

        const students = await Student_Profile.find({ class_Name:class_Name })
        if (!students || !students.length) {
            return res.status(200).send(new serviceResponse({ status: 404, errors: [{ message: "Class name not found" }] }))
        }
        else {
            const addedStudent=[];
           students.forEach(async student => {
                const newAttendance = new StudentAttendance({
                    student: student.userId,
                  createdBy:userId,
                    name: `${student.firstName} ${student.lastName}`,
                    className: class_Name,
                    attendance: attendance,
                    date: Date.now()
                });
    
                addedStudent.push(newAttendance)
            });
    const updadetStudent= await StudentAttendance.insertMany(addedStudent)
            return res.status(200).send(new serviceResponse({ status: 200,data:{students,updadetStudent}, message: "Attendance added successfully" }))
        }
    
      

    } catch (error) {
        return res.status(500).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
    }
}

module.exports = {
    addStudents,
}