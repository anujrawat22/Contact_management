const { Contact } = require("../Models/ContactModel")

exports.addContact = async (req, res) => {
    const { name, email, phoneNumber } = req.body
    const userId = req.userId
    try {
        const existingNumber = await Contact.findOne({ email, phoneNumber })
       
        if(existingNumber){
            return res.status(400).send({err : "Phone Number already exists "})
        }
    } catch (error) {

    }
}


exports.getContacts = async (req, res) => {
    try {

    } catch (error) {

    }
}


exports.getContactById = async (req, res) => {
    try {

    } catch (error) {

    }
}


exports.searchContacts = async (req, res) => {
    try {

    } catch (error) {

    }
}

exports.updateContact = async (req, res) => {
    try {

    } catch (error) {

    }
}


exports.deleteContact = async (req, res) => {
    try {

    } catch (error) {

    }
}