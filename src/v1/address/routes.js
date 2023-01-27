const { addAddress, getAddress, removeAddress, updateAddress } = require("./controller");
const { body,query } = require("express-validator");
const { validateErrors } = require("../utils/utils");


module.exports= (app)=>{
    app.post("/v1/address",[
        body("userId", "userId can not be null").not().isEmpty(),
        body("houseNo", "houseNo can not be null").not().isEmpty(),
        body("galiNo", "galiNo can not be null").not().isEmpty(),
        body("city", "city can not be null").not().isEmpty(),
        body("district", "district can not be null").not().isEmpty(),
        body("state", "state can not be null").not().isEmpty(),
        body("pincode","pincode can not be null").not().isEmpty(),
    ],validateErrors,addAddress)
    app.get("/v1/address", getAddress)
    app.delete("/v1/address",removeAddress)
    app.put("/v1/address", updateAddress)
}





   
