'use strict';
const { mailer } = require('../../../config/config');
const nodemailer = require("nodemailer");


module.exports = {
   
    sendMail: async function (to, cc, subject, body) {
        try {
            return new Promise(function (resolve, reject) {
                const transporter = nodemailer.createTransport({
                    service: mailer.service,
                    auth: {
                        user: mailer.user,
                        pass: mailer.pass
                    },
                });

                const mailOptions = {
                    from: mailer.user,
                    to: to,
                    cc: cc,
                    subject: subject,
                    html:body
                   
                };

                try {
                    transporter.verify(function (error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log("Server is ready send E-mails");
                        }
                    });
                    transporter.sendMail(mailOptions, function (err, info) {
                        if (err) {
                            reject(err.message);
                        } else {
                            resolve(info);
                        }
                    });
                } catch (err) {
                }
            });
        } catch (err) {
            return Promise.reject(err)
        }
    }
}