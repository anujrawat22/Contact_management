const { Router } = require("express")
const { addContact, getContacts, updateContact, deleteContact, getContactById, downloadpdf } = require("../Controllers/ContactController")


const ContactRouter = Router()

ContactRouter.get("/", getContacts)



ContactRouter.get("/:id", getContactById)


ContactRouter.post("/", addContact)

ContactRouter.put("/:id", updateContact)

ContactRouter.delete("/:id", deleteContact)

ContactRouter.get("/download/pdf", downloadpdf)

module.exports = { ContactRouter }