const mongoose = require('mongoose')


let subjectSchema=new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        default:null,
        required:true
    }
})

