const macaddress = require('macaddress')
const { passwordLog, loginLog } = require('../authorization/log')
let getMac = () =>{
    return new Promise(function(resolve,reject){
        macaddress.one(function(err,mac){
            if(err) reject(err)
            else resolve(mac)
        })
    })
}
let createLoginLog = async ({ip, email,userId})=>{
    try {
        let mac = await getMac()
        return loginLog.create({mac,ip,email,userId})
    } catch (error) {
      Promise.reject(error)  
    }
}
let createPasswordLog = async ({ip,email,userId})=>{
    try {
        let mac = await getMac()
        return passwordLog.create({mac,ip,email,userId})
    } catch (error) {
        Promise.reject(error)
    }
}


module.exports = {
    createPasswordLog,
    createLoginLog,
   
}