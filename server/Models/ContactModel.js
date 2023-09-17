const mongoose = require('mongoose')


const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    phoneNumber: { type: String, required: true }
}, {
    timestamps: true
})

const Contact = mongoose.model("Contact", ContactSchema)

module.exports = { Contact }