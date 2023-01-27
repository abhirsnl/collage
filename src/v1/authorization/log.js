const moment = require("moment/moment");
const Collection = require("../../../config/constant");
const mongoose = require('mongoose');

let loginLogSchema =  new mongoose.Schema({
    mac: { type: String, required: true, trim: true },
    ip: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    userId: { type: String, required: true, trim: true },
    createdOn: { type: Date, default: Date.now() },
    createdOnUnix: { type: String, default: moment().unix() }
})
let loginLog = mongoose.model(Collection.collections.loginLog, loginLogSchema);
module.exports = {
    loginLog
}
