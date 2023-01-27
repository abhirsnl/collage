const { addEducation, getEducation, removeEducation, updateEducation } = require("./controller");
const { body } = require("express-validator");
const { ReadPreference } = require("mongodb");
const { validateErrors } = require("../utils/utils");

module.exports = (app) => {
    /*add student Education api */
    app.post("/v1/education",
        [
            body("userId", "userId can not be null").not().isEmpty(),
            body("qualification", "qualification can not be null").not().isEmpty(),
        ], validateErrors, addEducation)
    app.get("/v1/education", getEducation)
    app.delete("/v1/education", removeEducation)
    app.put("/v1/education", updateEducation)
}
