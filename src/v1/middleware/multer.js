const multer = require('multer');
const constant = require('../../../config/constant')
const fs = require('fs')
const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|jfif|webp|svg)$/i)) {
        return cb(new Error('This file type is not allowed!'), false);
    }
    cb(null, true);
};

//Store profile picture 
const storeUserProfileFile = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(constant.fileUpload.defaultProfile)) {
            fs.mkdirSync(constant.fileUpload.defaultProfile, { recursive: true });
        }
        cb(null, constant.fileUpload.defaultProfile)
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});
const uploadUserProfileFile = multer({ storage: storeUserProfileFile, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter: imageFilter });
module.exports = {
   uploadUserProfileFile, 
}