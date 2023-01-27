const serviceResponse = require('../helper/serviceResponse');
const { Education } = require("./model");
const { User } = require('../authorization/model');
const { ObjectId } = require('mongodb');

const addEducation = async (req, res) => {
    try {
        const { userId, qualification } = req.body;
        const validUser = await User.findById({ _id: ObjectId(userId) });
        if (!validUser) {
            return res.send(new serviceResponse({ status: 404, errors: [{ message: "user not found" }] }))
        }
        const checkEducationExist = await Education.findOne({ userId: userId, qualification: qualification });
        if (checkEducationExist) {
            return res.send(new serviceResponse({ status: 404, errors: [{ message: "Qualification already exist" }] }))
        }
        let user = await Education.create(req.body);
        return res.send(new serviceResponse({ status: 200, data: user, message: "New admin created successfully" }))
    } catch (error) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
    }
}

const getEducation = async (req, res) => {
    try {
        const { userId, qualification, percentage } = req.query;
        const validUser = await User.findById({ _id: ObjectId(userId) });
        if (!validUser) {
            return res.send(new serviceResponse({ status: 404, errors: [{ message: "user not found" }] }))
        }
        const checkEducationExist = await Education.find({ userId: userId, qualification: qualification, percentage: { $gt: percentage } });
        if (checkEducationExist.length > 0) {
            return res.send(new serviceResponse({ status: 200, data: checkEducationExist, message: "Data fetched successfully" }))
        } else {
            return res.send(new serviceResponse({ status: 404, errors: [{ message: "Qualification not found" }] }))
        }

    } catch (error) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
    }
}
const removeEducation = async (req, res) => {
    try {
        const { userId, qualification, percentage } = req.query;
        const validUser = await User.findById({ _id: ObjectId(userId) });
        if (!validUser) {
            return res.send(new serviceResponse({ status: 404, errors: [{ message: "user not found" }] }))
        }
        const checkEducationExist = await Education.findOneAndDelete({ userId: userId, qualification: qualification, percentage: { $gt: percentage } });
        if (checkEducationExist) {
            return res.send(new serviceResponse({ status: 200, data: checkEducationExist, message: "Data deleted successfully" }))
        } else {
            return res.send(new serviceResponse({ status: 404, errors: [{ message: "Qualification not found" }] }))
        }

    }

    catch (error) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
    }


}
const updateEducation = async (req, res) => {
    try {
        const { userId } = req.body;
        const validUser = await User.findById({ _id: ObjectId(userId) });
        if (!validUser) {
            return res.send(new serviceResponse({ status: 404, errors: [{ message: "user not found" }] }))
        }
        const checkEducationExist = await Education.findOneAndUpdate({ userId: userId }, req.body);
        if (!checkEducationExist) {
            return res.send(new serviceResponse({ status: 404, errors: [{ message: "User education data not found" }] }))
        }
        return res.send(new serviceResponse({ status: 200, data: checkEducationExist, message: "Data updated successfully" }))

    }
    catch (error) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
    }
}

module.exports = {
    addEducation,
    getEducation,
    removeEducation,
    updateEducation

}