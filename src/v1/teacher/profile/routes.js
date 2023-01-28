
const { addTeacherProfile} = require("./controller")

module.exports = ((app) => {
    app.post("/teacher/addProfile", addTeacherProfile)
})