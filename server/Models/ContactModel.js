const mongoose = require('mongoose')


const ContactSchema = mongoose.Schema({
    email: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mobile : {type : Number , required : true},
    country_code : {type : String , required : true},
    
})

const Contact = mongoose.model("Contact", ContactSchema)

module.exports = { Contact }