const {signUpTeacher, userAdd, userGet, loginAdmin, forgotPassword, verifyOtp, resetPassword, signUpStudent, } = require("./controller");
const { body } = require("express-validator");
const { validateErrors } = require("../utils/utils");
const { verifyToken,  verifyStudent } = require("../middleware/jwtToken");


module.exports = (app) => {
    /* for creating new admin */
    app.post("/v1/teacher/signup",
        [
            body("email", "email can not be null").not().isEmpty(),
            body("password", "password can not be null").not().isEmpty(),

        ], validateErrors,signUpTeacher

    )
    app.post("/v1/student/signup",
    [
        body("email", "email is required").not().isEmpty().isEmail().withMessage("Please enter the correct email format, e.g. @gmail.com, @yahoo.com."),
        body("password", "password is required").not().isEmpty(),
        body("class_Name", "class is not be null").not().isEmpty()
    ], validateErrors, signUpStudent)
    /* login new admin */
    app.post("/v1/login",
        [
            body("email", "email is required").not().isEmpty().isEmail(),
            body("password", "password is required").not().isEmpty()
        ], validateErrors, loginAdmin)
   
    app.post("/v1/forgotpassword", forgotPassword)
    app.post("/v1/admin/user", userAdd)
    app.get("/v1/admin/get-user", verifyToken, verifyStudent, userGet)
    /* Generating token and sending it mail */
    app.post("/v1/forgot-password", forgotPassword);

    app.post("/v1/admin/verify-otp",
        [
            body("otp", "otp can not be null").not().isEmpty(),
        ], validateErrors, verifyToken, verifyOtp)
    /* Reseting password with token diatched from forgot-password */
    app.put("/v1/admin/reset-password",
        [
            body("password", "password must be required").not().isEmpty()
        ], validateErrors, verifyToken, resetPassword);


}