const mongoose = require("mongoose")
const { isValidObjectId } = require("mongoose")

const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
}

const isValidObjectid = function(ObjectId){
    return mongoose.Types.ObjectId.isValid(ObjectId)
  }

const createIntern = async function (req, res) {
    try {
        let data = req.body
        console.log(Object.keys(data))
        if (Object.keys(data).length = 0) {
            res.status(400).send({ status: false, data: "Bad Request" })      // (400) = {the server cannot or will not process the request due to something that is perceived to be a client error}
        }
        else 
        {
            const { name, email, mobile,collegeName } = data;

            if (!isValid(name)) {
                return res.status(400).send({
                    status: false,
                    msg: "name is required"
                })
            }

            if (!isValid(email)) {
                return res.status(400).send({
                    status: false,
                    msg: "email is required"
                })
            }

            if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
                return res.status(400).send({ status: false, msg: "Enter a valid email address" });
            }

            let uniqueEmail = await internModel.findOne({ email: data.email });// check email value present in collection or not
            if(uniqueEmail) return res.status(400).send({ status: false, msg: "Email already exist" });

            if (!isValid(mobile)) {
                return res.status(400).send({
                    status: false,
                    msg: "mobile is required"
                })
            }

            if (! /^[2-9]\d{9}$/.test(mobile))  {
                return res.status(400).send({ status: false, msg: "Enter a valid mobile number" })
            }
            let uniqueMobile=await internModel.findOne({mobile:data.mobile});// check for the mobile no already exist or not 
            if(uniqueMobile) return res.status(400).send({status:false, msg:"Mobile Number already exist"})

            if(!isValid(collegeName)){
                return res.status(400).send({status : false, msg : "Invalid College in request body"})
            }
            const findCollege = await collegeModel.findOne({name :data.collegeName, isDeleted : false})
            if (!findCollege) {
                return res.status(400).send({ msg: "College not found" })
            }   else
            {
                
                data.collegeId = findCollege._id
            
                let savedData = await internModel.create(data)
                res.status(201).send({ status: true,msg: "Registered successfully for internship ", data: savedData })
            }
     
        }
        
    }

    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: "error", err: err.message })

    }
}




module.exports.createIntern = createIntern