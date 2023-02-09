const { Student_Profile } = require("./model");
const { ObjectId } = require('mongodb');
const fs = require('fs');
const { User } = require('../../authorization/model');
const serviceResponse = require("../../helper/serviceResponse");
const { folder } = require("../../../../config/constant");



const addProfile = async (req, res) => {
    try {
        // Find the user in the User collection
        const userExist = await User.findOne({ _id: req.userId }).select('class_Name')

        // Check if the user exists
        if (!userExist) {
            return res.status(200).send(new serviceResponse({ status: 400, errors: [{ message: "User not Exist" }] }));
        }
        // Check if the Student_Profile already exists then update otherwise new entry.
        let updateUser = await Student_Profile.findOneAndUpdate(
            { userId: req.userId },
            { ...req.body, createdBy: req.userId, updatedBy: req.userId, class_Name: userExist.class_Name },
            { upsert: true, new: true }
        );

        // Return the updated Student_Profile
        return res.send(new serviceResponse({ status: 200, data: updateUser, message: "User Student_Profile updated successfully" }));
    } catch (error) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }));
    }
}

const getProfile = async (req, res) => {
    try {
        const { userId } = req;
        const checkProfileExist = await Student_Profile.findOne({ userId: userId })
        if (!checkProfileExist) {
            return res.send(new serviceResponse({ status: 404, errors: [{ message: "Data is not found" }] }))
        }
        else {
            return res.send(new serviceResponse({ status: 200, data: checkProfileExist, message: "Data found  successfully" }))
        }
    }
    catch (error) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
    }
}
const getProfileDetails = async (req, res) => {
    try {
        const { userId } = req.query;
        let user = await User.aggregate([
            {
                $match: { _id: ObjectId(userId) }
            },
            { /* Student_Profile Info */
                $lookup: {
                    from: 'studentprofiles',
                    localField: '_id',
                    foreignField: "userId",
                    as: 'studentprofiles'
                },
            },
            { /* Add Info */
                $lookup: {
                    from: 'addresses',
                    localField: '_id',
                    foreignField: "userId",
                    as: 'addresses'
                },
            },
            { /* Edu Info */
                $lookup: {
                    from: 'educations',
                    localField: '_id',
                    foreignField: "userId",
                    as: 'education'
                },

            },
            {
                $unwind: { path: '$profiles', preserveNullAndEmptyArrays: true }
            },

            // {
            //     $project: { _id: 1, dateOfBirth: '$profile.dateOfBirth', firstName: '$profile.firstName', userId: '$profile.userId', panNo
            //         : '$profile.panNo' }
            // },
        ])

        return res.send(new serviceResponse({ status: 200, data: user, message: "User profile data fetched successfully" }))

    } catch (error) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
    }
}

const updateProfileImage = async (req, res) => {
    try {
        let fileName = "";
        let userIdDirPath = "";
        const { files } = req.body
        const { userId } = req
        console.log(">>>>>>>>", req.userId)
        if (files) {

            userIdDirPath = `./${folder.userProfilePicStudent}/${userId}`;
            if (!fs.existsSync(userIdDirPath)) {
                fs.mkdirSync(userIdDirPath, { recursive: true });
            }
            const attachFile = files.image;
            if (!attachFile.name.match(/\.(jpg|jpeg|png|gif|jfif)$/)) {
                return Promise.reject('Only image files are allowed!')
            }
            const extArray = attachFile.name.split(".");
            const ext = extArray[extArray.length - 1];
            fileName = `${new Date().getTime()}.${ext}`;
            const folderPath = `${userIdDirPath}/${fileName}`;
            attachFile.mv(folderPath, function (error) {
                if (error) {
                    console.log(error);
                }
            });
            //const imgUrl = `${CONFIG.apiUrl}/student-profile-picture/${studentId}/${fileName}`;
            req.body.fileName = fileName;
        }
        const checkProfileExist = await Student_Profile.findOne({ userId })
        console.log("<<<<<<<<<<", checkProfileExist)
        if (!checkProfileExist) {
            return res.send(new serviceResponse({ status: 404, errors: [{ message: "Student_Profile image is not found" }] }))
        }
        const filePath = `${userIdDirPath}/${checkProfileExist.image}`;
        if (files && checkProfileExist.image)
            fs.unlink(filePath, (error) => {
                if (error) {
                    console.error(error);
                    if (!res.headersSent) {
                        return res.status(500).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
                    }
                }
            });
        if (files) {
            checkProfileExist.image = req.body.fileName;

            await checkProfileExist.save();
            return res.send(new serviceResponse({ status: 200, data: checkProfileExist, message: "Student_Profile image updated successfully" }))
        }
        else {
            return res.send(new serviceResponse({ status: 400, errors: [{ message: "Student_Profile image not updated" }] }))
        }
    } catch (error) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
    }
}

const studentSortByClassName = async (req, res) => {
    try {

        const { class_Name, firstName } = req.body;


        const studentExist = await Student_Profile.find({ class_Name: class_Name }) /*.select('firstName lastName')*/

        if (!studentExist) {
            return res.status(200).send(new serviceResponse({ status: 400, errors: [{ message: 'Class Name is not exist.Please enmter valid class name' }] }))
        }
//           const user = await Student_Profile.updateMany(
//     {},
//     { $concat: [ { $fullName: [ "$firstName", "" ] }, { $fullName: [ "lastName", "" ] } ] },
//     { multi: true }
// )
        // let user = await Student_Profile.aggregate([
        //     {
        //         $match: { class_Name: class_Name }
        //     },
          

        //     {
        //         $project: { fullName: { $concat: ["$firstName", " ", "$lastName"] },gender:'$gender' }
        //    },
            
        // ])
       
        return res.status(200).send(new serviceResponse({ status: 400, data: {studentExist}, message: 'Student data fetched by class Name' }))



    } catch (error) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
    }
}


module.exports = {
    addProfile, getProfile, getProfileDetails, updateProfileImage, studentSortByClassName,
}