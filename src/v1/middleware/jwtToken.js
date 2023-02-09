const jwt = require('jsonwebtoken');
const ServiceResponse = require('../helper/serviceResponse');
const { security } = require('../../../config/config');
const { User } = require('../authorization/model');
const constant = require('../../../config/constant');

const verifyToken = function (req, res, next) {
    var authorization = req.headers['authorization'];
    if (authorization) {
        var tokenBearer = authorization.split(' ');
        var token = tokenBearer[1];

        jwt.verify(token, security.secretKey, function (err, decoded) {
            if (err) {
                return res.status(403).send(new ServiceResponse({ status: 403, errors: [{ message: 'Unauthorized' }] }));
            }
            else {
                // console.log("vvvvvvvvvvvvvvvvv",decoded)
                req.email = decoded.email;
                req.ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
                req.roleId = decoded.roleId;
                req.userId = decoded.userId;
                next();
            }
        });
    }
    else {
        return res.status(403).send(new ServiceResponse({ status: 403, errors: [{ message: 'Token missing, Please login again' }] }));
    }
};

const verifyTeacher = async (req, res, next) => {
   
    const user = await User.findOne({ _id:req.userId, roleId:constant.roleId.teacher })
    console.log(">>>>>>>",user)
    if (!user) {
        return res.status(400).send(new ServiceResponse({ status: 400, errors: [{ message: 'Unauthorized user' }] }));
    }
    else if (user.status === constant._status.inactive) {
        return res.status(400).send(new ServiceResponse({ status: 400, errors: [{ message: 'Your account has been inactive' }] }));
    }
    else {
        req.userDetails = user
        next()
    }
};
const verifyStudent = async (req, res, next) => {
   
    const user = await User.findOne({ _id:req.userId, roleId:constant.roleId.student })
    console.log(">>>>>>>",user)
    if (!user) {
        return res.status(400).send(new ServiceResponse({ status: 400, errors: [{ message: 'Unauthorized user' }] }));
    }
    else if (user.status === constant._status.inactive) {
        return res.status(400).send(new ServiceResponse({ status: 400, errors: [{ message: 'Your account has been inactive' }] }));
    }
    else {
        req.userDetails = user
        next()
    }
};


module.exports = {
    verifyToken,
    verifyTeacher,
    verifyStudent,
    
}