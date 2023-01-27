
const { compareSync } = require("bcryptjs")
const jwt = require('jsonwebtoken');
const { security } = require("../../../config/config");
const config = require("../../../config/config");
const { auth } = require("../../../config/message");

const sing = (data, expTime) => {
    return jwt.sign(
        { ...data },
        security.secretKey,
        { expiresIn: expTime || security.expTime });
}

const comparePassword = (inputPassword, savedPassword) => {
    try {
        return compareSync(inputPassword, savedPassword);
    } catch (error) {
        return false
    }
}


const generateAuthorizationToken = ({email,userId,role}) =>{
    const token = jwt.sign({
userId : userId,
email : email,
role : role
    }, config.security.secretKey)
    return token
}
module.exports={
    sing,
    comparePassword,
    generateAuthorizationToken
}