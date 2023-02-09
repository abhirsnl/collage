
const cron = require('node-cron')
const fs = require('fs');
const { sendNotificationToTeacher } = require('../teacher/profile/controller');
const { mailer } = require('../../../config/config');
const { autoAttedance } = require('../attendance/controller');



const alertCron= cron.schedule("* 9 * * *", async function () {
  console.log("mail sent");
  let data = `mail sent from ${mailer.user}\n`;
  console.log(data);
  fs.appendFile('cron.txt', data, function (err) {
    if (err) throw err;
  });
  await sendNotificationToTeacher()
});

const updateStudentAttendance=cron.schedule("15 9 * * *", async function () {

  await autoAttedance()
});
module.exports={alertCron,updateStudentAttendance}






