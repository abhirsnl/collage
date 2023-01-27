const serviceResponse = require('../helper/serviceResponse');
const { Address } = require("./model");
const { User } = require("../authorization/model")
const { ObjectId } = require('mongodb');


// const addAddress = async (req, res) => {
//     try {

//         const { userId, addressType, houseNo, } = req.body;

//         const validUser = await User.findById({ _id: ObjectId(userId) });
//         if (!validUser) {
//             return res.send(new serviceResponse({ status: 404, errors: [{ message: "user not found" }] }))
//         }
//         const obj = {
//             userId: ObjectId(userId),
//         }
//         // if (addressType === "Permanent") {
//         //     obj.addressType = addressType
//         // }
//         const checkAddressExist = await Address.find(obj);
//         console.log(checkAddressExist)
//         if (checkAddressExist) {
//             return res.send(new serviceResponse({ status: 200, data: checkAddressExist, errors: [{message: "Uers Id allready exist" }]}))
//             // checkAddressExist.houseNo= houseNo;
//             //const a = await checkAddressExist.save() 
//             //return res.send(new serviceResponse({ status: 200, data: a, message: "Address updated  successfully" }))
//         }
//         else {
//             let user = await Address.create(req.body);
//             return res.send(new serviceResponse({ status: 200, data: user, message: "Address created successfully" }))
//         }

//     } catch (error) {
//         return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
//     }
// }
const addAddress = async (req, res) => {
    try {
        const { userId, addressType } = req.body;
        const validUser = await User.findById({ _id: ObjectId(userId) });
        if (!validUser) {
            return res.send(new serviceResponse({ status: 404, errors: [{ message: "User not found" }] }))
        }
        const checkAddressExist =  Address.findOne({ userId: userId, addressType: addressType })
        if (checkAddressExist) {
            return res.send(new serviceResponse({ status: 404, errors: [{ message: "User address already exist" }] }))
        }

        const createAddress = await Address.create(req.body);
        return res.send(new serviceResponse({ status: 200, data: createAddress, message: "User Address created " }))

    }
    catch (error) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
    }
}

const getAddress = async (req, res) => {
    try {
        const { userId, galiNo, houseNo } = req.query;

        console.log(req.query)
        const validUser = await User.findById({ _id: ObjectId(userId) });
        
        if (!validUser) {
            return res.send(new serviceResponse({ status: 404, errors: [{ message: "User not found" }] }))
        }
        const user = await Address.find( {userId:userId })
        
        if (!user) {
            return res.send(new serviceResponse({ status: 404, errors: [{ message: "User Address not found" }] }))
        }
        return res.send(new serviceResponse({ data: user, status: 200, message: "User Address found  successfully" }))

    } catch (error) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
    }
}


const removeAddress = async (req, res) => {
    try {
        const { id, userId } = req.query;
        // if (!id) {
        //     return res.send(new serviceResponse({ status: 404, errors: [{ message: `id is required` }] }))
        // }
        const addressExists = await Address.find({ userId:userId });
        if (!addressExists) {
            return res.send(new serviceResponse({ status: 404, errors: [{ message: "Id is not exist" }] }))
        } else {
            const deleteAddress = await Address.deleteOne({ userId:userId })
            console.log(deleteAddress)
            if (deleteAddress.deletedCount === 0) {
                return res.send(new serviceResponse({ status: 404, errors: [{ message: `address is not deleted ` }] }))
            } else {
                return res.send(new serviceResponse({ data: deleteAddress, status: 200, message: "Data deleted successfully" }))
            }
        }
    } catch (error) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
    }
}
const updateAddress = async (req, res) => {
    try {
        const { id, userId } = req.body;
        const validUser = await User.findById({ _id: ObjectId(userId) });
        if (!validUser) {
            return res.send(new serviceResponse({ status: 404, errors: [{ message: "user not found" }] }))
        }
        const checkAddress = await Address.findOneAndUpdate({ userId:userId}, req.body);
        if (!checkAddress) {
            return res.send(new serviceResponse({ status: 404, errors: [{ message: "User address data not found" }] }))
  
        }
        return res.send(new serviceResponse({ status: 200, data: checkAddress, message: "Address updated successfully" }))

    } catch (error) {
        return res.status(200).send(new serviceResponse({ status: 500, errors: [{ message: `${error.message}` }] }))
    }
}

module.exports = {
    addAddress, getAddress, removeAddress, updateAddress
}