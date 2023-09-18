const { Contact } = require("../Models/ContactModel")
const PDFDocument = require('pdfkit');

exports.addContact = async (req, res) => {
    const { name, email, phoneNumber } = req.body
    const userId = req.userId
    try {
        const existingNumber = await Contact.findOne({ email, phoneNumber })

        if (existingNumber) {
            return res.status(400).send({ err: "Phone Number already exists" })
        }

        const newContact = new Contact({ name, email, phoneNumber, userId })
        newContact.save()
        await newContact.populate('userId', 'name')
        res.status(201).send({ msg: "New contact created successfully", contact: newContact })

    } catch (error) {
        console.log("Error creating new contact :", error);
        res.status(500).send({ err: "Server error" })
    }
}



exports.getContacts = async (req, res) => {
    const userId = req.userId
    let { page, limit, title, sort } = req.query
    page = parseInt(page)
    limit = parseInt(limit)
    sort = parseInt(sort)
    try {
        let contacts;
        let query = { userId }

        if (title) {
            query.name = { $regex: title, $options: 'i' }
        }
        if (page && !limit) {
            await Contact.find(query).sort({ createdAt: sort }).skip((page - 1) * limit).limit(50).populate("userId", 'name')
        }
        else if (page && limit) {
            contacts = await Contact.find(query).sort({ createdAt: sort }).skip((page - 1) * limit).limit(limit).populate("userId", 'name')

        } else {
            contacts = await Contact.find(query).sort({ createdAt: sort }).populate('userId', 'name')
        }
        res.status(200).send({ contacts })
    } catch (error) {
        console.log("Error getting all contacts:", error);
        res.status(500).send({ err: "Server error" })
    }
}


exports.getContactById = async (req, res) => {
    const { id } = req.params;
    try {
        const contact = await Contact.findById(id).populate("userId", 'name')
        if (!contact) {
            return res.status(404).send({ err: `No contact found with id - ${id}` })
        }
        res.status(200).send({ contact })
    } catch (error) {
        console.log(`Error getting contact with id - ${id} :`, error);
        res.status(500).send({ err: "Server error" })
    }
}



exports.updateContact = async (req, res) => {
    const { name, phoneNumber, email } = req.body;
    const { id } = req.params
    const userId = req.userId
    try {
        const contact = await Contact.findOne({ _id: id, userId })
        if (!contact) {
            return res.status(404).send({ err: `No contact found with id - ${id}` })
        }

        contact.name = name;
        contact.phoneNumber = phoneNumber;
        contact.email = email;
        await contact.save()
        await contact.populate("userId", 'name')
        res.status(200).send({ contact })
    } catch (error) {
        console.log("Error updating the contact : ", error);
        res.status(500).send({ err: "Server error" })
    }
}


exports.deleteContact = async (req, res) => {
    const { id } = req.params
    const userId = req.userId
    try {
        const contact = await Contact.findOne({ _id: id, userId })
        if (!contact) {
            return res.status(404).send({ err: `No contact found with id - ${id}` })
        }

        await Contact.findByIdAndDelete(id)
        res.status(200).send({ msg: "Contact deleted successfully" })
    } catch (error) {
        console.log("Error deleting the contact :", error);
        res.status(500).send({ err: "Server error" })
    }
}

exports.downloadpdf = async (req, res) => {
    const userId = req.userId
    try {
        const contacts = await Contact.find({ userId })

        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=contacts.pdf');
        doc.pipe(res);
        doc.fontSize(12);
        contacts.forEach((contact) => {
            doc.text(`Name: ${contact.name}`);
            doc.text(`Email: ${contact.email}`);
            doc.text(`Phone Number: ${contact.phoneNumber}`);
            doc.moveDown(); 
        });

         
        doc.end();
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ error: 'Server error' });
    }
}