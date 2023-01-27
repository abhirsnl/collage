// const { body } = require("express-validator")
// const { verifyToken, verifyTeacher } = require("../middleware/jwtToken")
// const { validateErrors } = require("../utils/utils")
// const { studentAttendanceAdd, studentAttendanceGet, studentAttendanceUpdate } = require("./controller")

// module.exports = (app) => {
//     app.post("/v1/studentAttendance/add", studentAttendanceAdd);
//     app.get("/v1/studentAttendance/get", verifyToken, verifyTeacher, studentAttendanceGet)
//     app.post("/v1/studentAttendance/update", verifyToken, verifyTeacher, studentAttendanceUpdate)


//     }