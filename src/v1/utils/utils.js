let jwt = require('jsonwebtoken');
let { secret } = require('../../../config/config');
const referralCodes = require('referral-codes');
const { validationResult } = require('express-validator');
const serviceResponse = require('../helper/serviceResponse');

/** to check object key vale  */
let isEmpty = (data) => {
    if (data.constructor === Array) {
        for (let element of data) {
            let i = 0;
            for (let key in element) {
                if (element[key] == undefined || typeof (element[key]) == 'undefined' || element[key] == null) {
                    return { status: true, error: `${key} is required.`, type: `${typeof (key)} line no : ${i++}` }
                }
                else {
                    if (element[key].constructor === Array && Object.entries(element[key]).length === 0) {
                        return { status: true, error: `${key} is required.`, type: "Array" }
                    }
                    else if (element[key].constructor === Object && Object.entries(element[key]).length === 0) {
                        return { status: true, error: `${key} is required.`, type: "Object" }
                    }
                    else if (element[key].constructor === String && Object.entries(element[key]).length === 0) {
                        return { status: true, error: `${key} is required.`, type: "String" }
                    }
                }
            };
        };
        return { status: false, error: null }
    } else {
        for (let key in data) {
            if (data[key] == undefined || typeof (data[key]) == 'undefined' || data[key] == null) {
                return { status: true, error: `${key} is required..`, type: `${typeof (key)}` }
            }
            else {
                if (data[key].constructor === Array && Object.entries(data[key]).length === 0) {
                    return { status: true, error: `${key} is required.`, type: "Array" }
                }
                else if (data[key].constructor === Object && Object.entries(data[key]).length === 0) {
                    return { status: true, error: `${key} is required.`, type: "Object" }
                }
                else if (data[key].constructor === String && Object.entries(data[key]).length === 0) {
                    return { status: true, error: `${key} is required.`, type: "String" }
                }
            }
        }
        return { status: false, error: null }
    }
}

let signToken = (plainText) => {
    return jwt.sign({
        data: plainText
    }, secret, { expiresIn: '10h' });
}

const errorFormatter = ({ location, msg, param }) => {
    return {
        "message": msg,
        "param": param,
        "location": location
    }
};

const generateCode = ({ length }) => {
    return referralCodes.generate({ length, charset: referralCodes.charset("alphanumeric") })[0]
}

const generateSupportNo = () => {
    return "NS-" + referralCodes.generate({ length: 8, charset: referralCodes.charset("numbers") })[0]
}

const generateReportNo = () => {
    return "NR-" + referralCodes.generate({ length: 8, charset: referralCodes.charset("numbers") })[0]
}

const generateWithdrawNo = () => {
    return "NWR-" + referralCodes.generate({ length: 8, charset: referralCodes.charset("numbers") })[0]
}

function encryptyMessage(message) {
    let newMsg = ""
    if (message) {
        newMsg = message.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, "******************(Illegal activity detected)")
        newMsg = newMsg.replace(/([0-9]){6,}/g, "*******(Illegal activity detected)")
        return newMsg
    }
    else {
        return message
    }
}

const toCapitalize = (str) => {
    let newStr = str.charAt(0).toUpperCase() + str?.substring(1)
    newStr = newStr.replace(/ [a-zA-Z0-9]/g, c => c.toUpperCase());
    return newStr
}

function checkEmailMobile(message) {
    let newMsg = ""
    if (message) {
        let emailReg = new RegExp(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)
        if (emailReg.test(message)) {
            newMsg = "Trying to share emailId"
        }
        let mobileReg = new RegExp(/([1-9]){6,}/g)
        if (mobileReg.test(message)) {
            newMsg = newMsg ? "Trying to share emailId & mobileNo" : "Trying to share mobileNo"
        }
        return newMsg
    }
    else {
        return message
    }
}

function encryptyAccountNo(account) {
    let accountNo = account
    if (accountNo) {
        accountNo = accountNo.replace(/\d(?=\d{4})/g, "*")
        return accountNo
    } else {
        return null
    }
}
const validateErrors = (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: errors.array() }))
    }
    next();
}

module.exports = {
    isEmpty,
    signToken,
    errorFormatter,
    validateErrors,
    generateCode,
    generateSupportNo,
    generateReportNo,

    generateWithdrawNo,

    encryptyMessage,

    toCapitalize,
    checkEmailMobile,
    encryptyAccountNo
}

