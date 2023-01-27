// const serviceResponse = require('../helper/serviceResponse');
// const { Profile } = require("./model");
// const { User } = require("../authorization/model")
// const { ObjectId } = require('mongodb');
// const fs = require('fs');
// const { folder } = require('../../../config/constant');
// const { Console } = require('console');

// const addProfile = async (req, res) => {
//     try {
//         // Find the user in the User collection
//         const userExist = await User.findOne({ _id: req.userId }).select('className')

//         // Check if the user exists
//         if (!userExist) {
//             return res.status(200).send(new serviceResponse({ status: 400, errors: [{ message: "User not Exist" }] }));
//         }
//         // Check if the Profile already exists then update otherwise new entry.
//         let updateUser = await Profile.findOneAndUpdate(
//             { userId: req.userId },
//             { ...req.body, createdBy: req.userId, updatedBy: req.userId, className: userExist.className },
//             { upsert: true, new: true }
//         );

//         // Return the updated Profile
//         return res.send(new serviceResponse({ status: 200, data: updateUser, message: "User Profile updated successfully" }));
//     } catch (error) {
//         return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }));
//     }
// }

// const getProfile = async (req, res) => {
//     try {
//         const { userId } = req;
//         const checkProfileExist = await Profile.findOne({ userId: userId })
//         if (!checkProfileExist) {
//             return res.send(new serviceResponse({ status: 404, errors: [{ message: "Data is not found" }] }))
//         }
//         else {
//             return res.send(new serviceResponse({ status: 200, data: checkProfileExist, message: "Data found  successfully" }))
//         }
//     }
//     catch (error) {
//         return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
//     }
// }
// const getProfileDetails = async (req, res) => {
//     try {
//         const { userId } = req.query;
//         let user = await User.aggregate([
//             {
//                 $match: { _id: ObjectId(userId) }
//             },
//             { /* Profile Info */
//                 $lookup: {
//                     from: 'profiles',
//                     localField: '_id',
//                     foreignField: "userId",
//                     as: 'profiles'
//                 },
//             },
//             { /* Add Info */
//                 $lookup: {
//                     from: 'addresses',
//                     localField: '_id',
//                     foreignField: "userId",
//                     as: 'addresses'
//                 },
//             },
//             { /* Edu Info */
//                 $lookup: {
//                     from: 'educations',
//                     localField: '_id',
//                     foreignField: "userId",
//                     as: 'education'
//                 },

//             },
//             {
//                 $unwind: { path: '$profiles', preserveNullAndEmptyArrays: true }
//             },
            
//             {
//                 $project: { _id: 1, dateOfBirth: '$profile.dateOfBirth', firstName: '$profile.firstName', userId: '$profile.userId', panNo
//                     : '$profile.panNo' }
//             },
//         ])

//         return res.send(new serviceResponse({ status: 200, data: user, message: "User profile data fetched successfully" }))

//     } catch (error) {
//         return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
//     }
// }

// const updateProfileImage = async (req, res) => {
//     try {
//         let fileName = "";
//         let userIdDirPath = "";
//         const { files } = req
//         const { userId } = req
//         console.log(">>>>>>>>", req.userId)
//         if (files) {

//             userIdDirPath = `./${folder.userProfilePic}/${userId}`;
//             if (!fs.existsSync(userIdDirPath)) {
//                 fs.mkdirSync(userIdDirPath, { recursive: true });
//             }
//             const attachFile = files.image;
//             if (!attachFile.name.match(/\.(jpg|jpeg|png|gif|jfif)$/)) {
//                 return Promise.reject('Only image files are allowed!')
//             }
//             const extArray = attachFile.name.split(".");
//             const ext = extArray[extArray.length - 1];
//             fileName = `${new Date().getTime()}.${ext}`;
//             const folderPath = `${userIdDirPath}/${fileName}`;
//             attachFile.mv(folderPath, function (error) {
//                 if (error) {
//                     console.log(error);
//                 }
//             });
//             //const imgUrl = `${CONFIG.apiUrl}/student-profile-picture/${studentId}/${fileName}`;
//             req.body.fileName = fileName;
//         }
//         const checkProfileExist = await Profile.findOne({ userId })
//         console.log("<<<<<<<<<<", checkProfileExist)
//         if (!checkProfileExist) {
//             return res.send(new serviceResponse({ status: 404, errors: [{ message: "Profile is not found" }] }))
//         }
//         const filePath = `${userIdDirPath}/${checkProfileExist.image}`;
//         if (files && checkProfileExist.image)
//             fs.unlink(filePath, (error) => {
//                 if (error) {
//                     console.error(error);
//                     if (!res.headersSent) {
//                         return res.status(500).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
//                     }
//                 }
//             });
//         if (files) {
//             checkProfileExist.image = req.body.fileName;

//             await checkProfileExist.save();
//             return res.send(new serviceResponse({ status: 200, data: checkProfileExist, message: "Profile image updated successfully" }))
//         }
//         else {
//             return res.send(new serviceResponse({ status: 400, errors: [{ message: "Profile image not updated" }] }))
//         }
//     } catch (error) {
//         return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
//     }
// }
// module.exports = {
//     addProfile, getProfile, getProfileDetails, updateProfileImage
// }