const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type : String,
        unique : [true, "Email id already present!"],
        required: true,
        validate(value) {
            if (!validator.isEmail(value)){
                throw new Error("INvalid Email");
            }
        }
    },
    phone : {
        type : Number,
        min : 10,
        required : true,
        unique : true

    },
    address : {
        type : String,
        required : true
    }
})

//create collection
const Student = new mongoose.model("Student",studentSchema);

module.exports = Student;