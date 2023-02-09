const { verifyTeacher } = require("../middleware/jwtToken");
const { validateErrors } = require("../utils/utils");
const { addStudents } = require("./controller");

module.exports = (app) =>{
app.post('/attendance/add/:userId',validateErrors,addStudents)


}