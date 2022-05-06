const mongoose = require('mongoose')
const moment = require('moment')

let date = moment().format('DD/MM/YYYY');
console.log(date)

const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({

    "name" : {
        type : String,
        required : true, 
        trim : true
    },

    "email": {
        type: String,
        // validate1:[isValidEmail,"enter valid email"]
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: "Please enter a valid email"
        },
        required: true, 
        unique: true,
        lowercase : true,
        trim: true
    },

    mobile: {
        type: String,
        trim: true,
        unique: [true,"This number is already registered"],
        validate: {
            validator: function (mobile) {
                return  /^[0-9]{10}$/.test(mobile);
            },
            message: "Please enter a valid number"
        },
        required: [true, "Mobile number is mandatory"]
    },

    "collegeId" : {
        type : ObjectId,
        ref : "College" ,
        required : true, 
        trim : true
    },

    "isDeleted" : {
        type : Boolean,
        default : false
}

}, {timestamps : true})

module.exports = mongoose.model("Intern", internSchema)