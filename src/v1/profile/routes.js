// const { addProfile, getProfile, getProfileDetails, updateProfileImage } = require("./controller");
// const { body } = require("express-validator");
// const { validateErrors } = require("../utils/utils");
// const { verifyToken } = require("../middleware/jwtToken");

// module.exports = (app) => {
//     app.post("/v1/add-profile",
//         [
//             body("mobileNo", "mobileNo can not be null").not().isEmpty().isLength({ min: 10, max: 10 }).withMessage("Mobile Number must contain "),
//             body("dateOfBirth", "dateOfBirth can not be null").not().isEmpty().isDate().withMessage("Date of birth type in this formate (yyyy/mm/dd) "),
//             body("firstName", "firstName can not be null").not().isEmpty(),
//         ],
//         verifyToken, validateErrors, addProfile)

//     app.get("/v1/get-profile", verifyToken, getProfile)
//     app.get("/v1/profiles", getProfileDetails)
//     app.put("/v1/profiles/userImage", verifyToken, updateProfileImage)
// }




