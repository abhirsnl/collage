const { ObjectId } = require('mongodb');
const { folder } = require('../../../../config/constant');
const fs = require('fs');
// const { folder } = require('../../../config/constant');
const { User } = require("../../authorization/model");
const serviceResponse = require("../../helper/serviceResponse");
const { Teacher_Profile } = require("./model");
const { sendMail } = require('../../helper/nodemailer');


const addTeacherProfile = async (req, res) => {

  try {
    /*  if using the token verification then don't use req.body and not using userExist code  */
    const { userId } = req.body
    const userExist = await User.findById({ _id: ObjectId(userId) })
    if (!userExist) {
      return res.status(200).send(new serviceResponse({ status: 200, errors: [{ message: "User is not fond" }] }))
    }
    let updateUser = await Teacher_Profile.findOneAndUpdate(
      { userId: userId },
      { ...req.body, createdBy: userId, updatedBy: userId, email: userExist.email },
      { upsert: true, new: true });
    delete req.body.email;
    await updateUser.save();
    return res.status(200).send(new serviceResponse({ status: 200, data: updateUser, message: "User created and updated" }))
  } catch (error) {
    return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }));

  }
}

const uploadProfileImage = async (req, res) => {
  try {
    let fileName = "";
    let userIdDirPath = "";
    const { files } = req;
    //   console.log("<<<<<<<<<<<<<<<<", req);
    const { userId } = req.body;
    if (files) {
      userIdDirPath = `./${folder.userProfilePicTeacher}/${userId}`;
      if (!fs.existsSync(userIdDirPath)) {
        fs.mkdirSync(userIdDirPath, { recursive: true });
      }
      const attachFile = files.image;
      if (!attachFile.name.match(/\.(jpg|jpeg|png|gif|jfif)$/)) {
        return res.status(400).send(new serviceResponse({
          status: 400,
          errors: [{ message: "Only image files are allowed!" }],
        }));
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
      req.body.fileName = fileName;
    }
    const checkProfileExist = await Teacher_Profile.findOne({ userId });
    if (!checkProfileExist) {
      return res.status(404).send(new serviceResponse({
        status: 404,
        errors: [{ message: "Teacher Profile is not found" }],
      }));
    }
    const filePath = `${userIdDirPath}/${checkProfileExist.image}`;
    if (files && checkProfileExist.image) {
      fs.unlink(filePath, (error) => {
        if (error) {
          console.error(error);
          return res.status(500).send(new serviceResponse({
            status: 500,
            errors: [{ message: `${error.message}` }],
          }));
        }
      });
    }
    if (files) {
      checkProfileExist.image = req.body.fileName;
      await checkProfileExist.save();
      return res.send(
        new serviceResponse({
          status: 200,
          data: checkProfileExist,
          message: "Teacher_Profile image updated successfully",
        })
      );
    } else {
      return res.status(400).send(
        new serviceResponse({
          status: 400,
          errors: [{ message: "Teacher_Profile image not updated" }],
        })
      );
    }
  } catch (error) {
    return res.status(500).send(
      new serviceResponse({
        status: 500,
        errors: [{ message: `${error.message}` }],
      })
    );
  }
};


const sendNotificationToTeacher = async (req, res) => {

  try {
    const teacher = await User.find({})
    if (teacher.length > 0) {
      let allEmail = [];

      for (value of teacher) {
        allEmail.push(value.email)
      }
      try {
        await sendMail(
          allEmail,
          null,
          "Cron job notification>>>>>>>>>><<<<<",
          `Hi, Good morning,
          This is a notification from your school's management system.`
        );
      } catch (error) {
        console.error(error.message);
      }

      console.log(">>>>>>>>>>><<<<<><><><>", allEmail)


    }
  }
  catch (error) {
    return res.status(500).send(new serviceResponse({ status: 500,errors: [{ message: `${error.message}` }],}));
  }
}
module.exports = {
  addTeacherProfile, uploadProfileImage, sendNotificationToTeacher
}