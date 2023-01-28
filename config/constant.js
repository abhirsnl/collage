module.exports = {
    collections: {
        user: 'user',
        address: 'address',
        education: 'education',
        student_profile: 'studentProfile',
        teacher_Profile:'teacherProfile',
        passwordLog: 'passwordLog',
        loginLog: 'loginLog',
        studentAttendance: 'studentAttendance'

    },

    roleId: {

        admin: 1,
        teacher: 2,
        student: 3,

    },
   
    _status: {

        /* User status */
        active: "1", /*Active */
        inactive: "0", /* User not able to login */
        drop: "-1", /* Once user deleted account */
    },




    folder: {
        userProfilePic: "uploadimage"
    },

}