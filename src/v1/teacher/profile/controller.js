const { ObjectId } = require('mongodb');
const { User } = require("../../authorization/model");
const serviceResponse = require("../../helper/serviceResponse");
const { Teacher_Profile } = require("./model");


const addTeacherProfile = async (req, res) => {

    try {
        const { userId} = req.body
        const userExist = await User.findById({_id:ObjectId(userId)} )
        if (!userExist) {
            return res.status(200).send(new serviceResponse({ status: 200, errors: [{ message: "User is not fond" }] }))
        }
        let updateUser = await Teacher_Profile.findOneAndUpdate(
            { userId: userId ||firstName },
            { ...req.body, createdBy: userId, updatedBy: userId, },
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