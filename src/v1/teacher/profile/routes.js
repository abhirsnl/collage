
const { body } = require("express-validator")
const { validateErrors } = require("../../utils/utils")
const { addTeacherProfile, uploadProfileImage} = require("./controller")

module.exports = (app) => {
    app.post("/teacher/addProfile", [
        body("firstName", "firstName is not null").not().isEmpty(),
        body("dateOfBirth", "dateOfBirth is not null").not().isEmpty().isDate().withMessage("Date of Birth must be in yyyy/mm/dd formate"),
        body("mobileNo","mobileNo is not null").not().isEmpty().isNumeric().withMessage("Must be in number").isLength({min:6, max:10}).withMessage("Mobile No. must be contain between min 6 to max 10 ")
    ],validateErrors,addTeacherProfile)
    app.post("/teacher/add-image",uploadProfileImage)
}