const { Router } = require("express")
const { addContact, getContacts, updateContact, deleteContact, getContactById, searchContacts } = require("../Controllers/ContactController")

const ContactRouter = Router()

ContactRouter.get("/", getContacts)

ContactRouter.get("/:id", getContactById)

ContactRouter.get("/search", searchContacts)

ContactRouter.post("/", addContact)

ContactRouter.put("/:id", updateContact)

ContactRouter.delete("/:id", deleteContact)


module.exports = { ContactRouter }