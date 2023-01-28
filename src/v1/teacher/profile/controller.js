const { ObjectId } = require('mongodb');
const { User } = require("../../authorization/model");
const serviceResponse = require("../../helper/serviceResponse");
const { Teacher_Profile } = require("./model");


const addTeacherProfile = async (req, res) => {

    try {
        const { userId,_id } = req.body
        const userExist = await User.findById({_id:ObjectId(userId)} )
        if (!userExist) {
            return res.status(200).send(new serviceResponse({ status: 200, errors: [{ message: "User is not fond" }] }))
        }
        let updateUser = await Teacher_Profile.findOneAndUpdate(
            { userId: req.userId },
            { ...req.body, createdBy: req.userId, updatedBy: req.userId, class_Name: userExist.class_Name },
            { upsert: true, new: true }
        );
        return res.status(200).send(new serviceResponse({ status: 200, data: updateUser, message: "User created and updated" }))
    } catch (error) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }));

    }
}
module.exports = {
    addTeacherProfile
}