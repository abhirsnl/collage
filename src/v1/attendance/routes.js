const { verifyTeacher, verifyToken } = require("../middleware/jwtToken");
const { validateErrors } = require("../utils/utils");
const { addStudents, removeAttendance } = require("./controller");

module.exports = (app) =>{
app.post('/attendance/add',validateErrors,verifyToken,verifyTeacher,addStudents)
app.post('/attendance/rem/:userId',validateErrors,removeAttendance)


}