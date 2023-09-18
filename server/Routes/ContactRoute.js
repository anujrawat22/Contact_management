const { Router } = require("express")
const { addContact, getContacts, updateContact, deleteContact, getContactById } = require("../Controllers/ContactController")
const { Contact } = require("../Models/ContactModel")

const ContactRouter = Router()

ContactRouter.get("/", getContacts)

ContactRouter.post("/many", async (req, res) => {
    const userId = req.userId
    try {
        const { data } = req.body;
        for (let i = 0; i < data.length; i++) {
            const contact = new Contact({ email: data[i].email, phoneNumber: data[i].phoneNumber, name: data[i].name, userId })
            await contact.save()
        }
        res.send({ msg: "created" })
    } catch (error) {
        console.log(error);
    }
})

ContactRouter.get("/:id", getContactById)


ContactRouter.post("/", addContact)

ContactRouter.put("/:id", updateContact)

ContactRouter.delete("/:id", deleteContact)


module.exports = { ContactRouter }