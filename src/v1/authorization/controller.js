const serviceResponse = require('../helper/serviceResponse');
const { User } = require("./model");
const { validationResult } = require('express-validator');
const { errorFormatter } = require('../utils/utils');
const { ObjectId } = require('mongodb');
const { defaults, _status } = require('../../../config/constant');
const { comparePassword, generateAuthorizationToken } = require("../helper/loginHelper");
const jwt = require('jsonwebtoken');
const { security } = require('../../../config/config');
const { createLoginLog } = require('../helper/logs')
const { sendMail } = require('../helper/nodemailer');
const { request } = require('express');
const moment = require('moment');
const { verifyToken } = require('../middleware/jwtToken');
const constant = require('../../../config/constant');

const signUpTeacher = async (req, res) => {
    try {
       
        const { email} = req.body;
        const isAlready = await User.findOne({ email });
        if (isAlready) return res.send(new serviceResponse({ status: 400, errors: [{ message: "This email already exists" }] }))
        let user = await User.create([{ ...req.body, status: _status.active, }]);

        return res.send(new serviceResponse({ status: 200, data: user, message: "You have been registered successfully." }))
    } catch (error) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
    }
}
const signUpStudent = async (req, res) => {
    try {
        const { email} = req.body;
        const isAlready = await User.findOne({email});
        if (isAlready) return res.send(new serviceResponse({ status: 400, errors: [{ message: "This email already exists" }] }))
        let user = await User.create([{ ...req.body, status: _status.active, roleId:constant.roleId.student }]);
        return res.send(new serviceResponse({ status: 200, data: user, message: "You have been registered successfully." }))
    } catch (error) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
    }
}
const loginAdmin = async (req, res) => {
    try {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            return res.status(200).send(new serviceResponse({ status: 500, errors: errors.array() }))
        }
        const { email, password } = req.body;
        const admin = await User.findOne({ email: email.toLowerCase(), deleteAt: null, status: { $in: ["1", "0"]  }})
        if (!admin) {
            return res.send(new serviceResponse({ status: 404, errors: [{ message: "No admin found corrosponding to this email address" }] }))
        }
        // Password validation
        const checkPassword = comparePassword(password, admin.password);
        if (!checkPassword) {
            return res.status(200).send(new serviceResponse({ status: 400, errors: [{ message: "Incorrect password" }] }))
        }
        if (admin.status !== _status.active) {
            return res.status(200).send(new serviceResponse({ status: 400, errors: [{ message: "You are currently" + " " + admin.status }] }))
        }
        // Creating Login log
        await createLoginLog({ email: admin.email, userId: admin._id, ip: req.header('x-forwarded-for') || req.connection.remoteAddress })
        // Generate authorization token
        let token = generateAuthorizationToken({ email: email, userId: admin._id, roleId: admin.roleId })
        // prepare responce
        const result = {
            email: admin.email,
            userId: admin._id,
            roleId: admin.roleId,
            token
        }
        return res.send(new serviceResponse({ status: 200, data: result, message: "Successfully login" }))
    } catch (error) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.send(new serviceResponse({ status: 400, errors: [{ message: "Email is requirecd" }] }))
        }
        const admin = await User.findOne({ email})
        if (!admin) {
            return res.send(new serviceResponse({ status: 404, errors: [{ message: "No admin found corrosponding to this email address" }] }))
        }
        admin.otpExpireAt = Date.now() + (1000 * 60);
        admin.otp = generateOTP()


        await admin.save();
            let timeLeft = Math.floor(((((Date.now()) -(admin.otpExpireAt)) / 1000)*-1)+1);
        const token = jwt.sign({
            userId: admin._id,
            email: admin.email
        }, security.secretKey);
        await sendMail(
            admin.email,
            null,
            "Reset password",

            `Ohh, It's look like you forgot your password,enter otp ${admin.otp} and reset your password. OTP expired 
            And otp exprired within  ${timeLeft} sec`
        )
        return res.send(new serviceResponse({ status: 200, data: token, message: "Reset password otp has been dispatched to your registered email" }))


    } catch (error) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
    }
}
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
}
const verifyOtp = async (req, res) => {
    try {

        console.log(req.userId)
        const { email, userId } = req;
        const { otp } = req.body;

        const admin = await User.findOne({ userId: userId, email: email, });
        if (!admin) {
            return res.status(404).send(new serviceResponse({ status: 404, errors: [{ message: 'User not found' }] }));
        }
        if (admin.otp !== otp) {
            return res.status(403).send(new serviceResponse({ status: 403, errors: [{ message: 'Invalid Otp' }] }))
        }
        // Check if the OTP is expired
        if (admin.otpExpireAt < Date.now()) {
            return res.status(401).send(new serviceResponse({ status: 401, errors: [{ message: "OTP expired" }] }))
        }
        admin.otpVerified = true,
            admin.otpExpireAt = null;
        admin.otp = null;
        await admin.save();
        const result = {
            otp: admin.otp,
            otpExpireAt: admin.otpExpireAt,
            otpVerified: admin.otpVerified
        }
        return res.status(200).send(new serviceResponse({ status: 200, data: result, message: 'Your otp verified go to next step' }))
    } catch (error) {
        return res.status(400).send(new serviceResponse({ status: 400, errors: [{ message: `${error.message}` }] }));
    }


}

const verifyTokenExpired = async (req, res) => {
    try {
        const { token } = req.params;
        try {
            const decode = jwt.verify(token, security.secretKey)
            /* checking is admin exist or not*/
            const admin = await User.findOne({ email: decode.email, role: defaults.admin }).select("otpExpireAt email");
            if (!admin) {
                return res.send(new serviceResponse({ errors: [{ message: "No admin found corrosponding to this email address" }] }))
            }
            /* Retreiving user from database as admin exists */
            if (!admin.otpExpireAt) {
                return res.send(new serviceResponse({
                    data: {
                        tokenStatus: "expired",
                        message: "token has already been used or expired"
                    }
                }))
            }
            const nowDate = moment(Date.now());
            const expiryDate = moment(admin.otpExpireAt);
            /* checking if otpExpireAt is not null and date is not ahead of current time */
            if (expiryDate.isBefore(nowDate)) {
                /* removing when token expires */
                admin.otpExpireAt = null;
                await admin.save();

                /* returning token expire response */
                return res.send(new serviceResponse({
                    status: 200,
                    data: {
                        tokenStatus: "expired",
                        message: "your token has expired"
                    }
                }))
            }
            else {
                return res.send(new serviceResponse({
                    status: 200,
                    data: {
                        tokenStatus: "live",
                        message: `token is valid but will expire in ${((moment(Date.now()) - moment(admin.otpExpireAt)) / 1000) * -1 + " sec"}`
                    }
                }))
            }


        } catch (error) {
            console.error("Error while validation token  >>>", error)
            return res.status(403).send(new serviceResponse({ status: 403, errors: [{ message: 'Unauthorized' }] }))
        }

    } catch (error) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))

    }
}
const resetPassword = async (req, res) => {
    try {
        const { email, userId } = req;
        const { password } = req.body
        const admin = await User.findOne({ userId: userId, email: email })
        if (!admin) {
            return res.send(new serviceResponse({ status: 400, errors: [{ message: "User is not fond" }] }))
        }
        if (!admin.otpVerified) {
            return res.send(new serviceResponse({ status: 400, errors: [{ message: "OTP is not verified" }] }))
        }
        admin.password = password;
        admin.otpVerified = false
        await admin.save()
        return res.status(200).send(new serviceResponse({ status: 200, data: admin, message: "Your password updated successfully" }))

    } catch (error) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: [`${error.message}`] }))
    }
}

const userAdd = async (req, res) => {
    try {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            return res.status(200).send(new serviceResponse({ status: 500, errors: errors.array() }))
        }
        const { mobileNo, dateOfBirth } = req.body;
        /* Returning field error */
        if (!mobileNo || !dateOfBirth) return res.send(new serviceResponse({ status: 400, errors: [{ message: "mobileNo and date of birth are required" }] }))
        let user = await UserNew.create([{ ...req.body, role: 1 }]);
        return res.send(new serviceResponse({ status: 200, data: user, message: "New user profile created successfully" }))
    } catch (error) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
    }
}

const userGet = async (req, res) => {
    try {
        const { userId} = req;
        let user = await User.findOne({ _id: ObjectId(userId)});
        if (!user) {
            return res.send(new serviceResponse({ status: 404, errors: [{ message: "record not found" }] }))
        }
        return res.send(new serviceResponse({ status: 200, message: "User profile find successfully", data: user }))


    } catch (error) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
    }
}


module.exports = {
    signUpTeacher,
    signUpStudent,
    loginAdmin,
    forgotPassword,
    verifyOtp,
    resetPassword,
    userAdd,
    userGet,
}