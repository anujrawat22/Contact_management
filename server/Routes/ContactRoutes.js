const { Router } = require("express")
const { addContact, getContacts, updateContact, deleteContact } = require("../Controllers/ContactController")

const ContactRouter = Router()

ContactRouter.post("/", addContact)


ContactRouter.get("/:id", getContacts)

ContactRouter.put("/:id", updateContact)

ContactRouter.delete("/:id", deleteContact)


module.exports = { ContactRouter }