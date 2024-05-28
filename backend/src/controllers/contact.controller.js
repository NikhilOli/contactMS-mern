import Contact from '../models/contact.model.js'

const addContact = async (req, res) => {
    const {username, email, phone, address} = req.body
    if(!username || !email || !phone || !address) return res.status(401).json({message: "Please fill all the fields"})

    try {
        const existingContact = await Contact.findOne({email, phone});
        if(existingContact){
            return res.json({message: "Contact already exists"})
        }
        const newContact = Contact.create({
            username,
            email,
            phone,
            address,
            postedBy: req.user.id
        })

        return res.status(201).json({ message: "New contact created", newContact });
    } catch (error) {
        console.log("Errror creating contact");
    }
}


const contacts = async (req, res) => {
    try {
        const userContacts = await Contact.find({ postedBy: req.user.id });
        const contactCount = userContacts.length;

        return res.status(200).json({
            message: "Successfully fetched contacts",
            contacts: userContacts,
            contactCount: contactCount
        });
    } catch (error) {
        console.log("Error showing contacts", error);
        return res.status(500).json({ message: error });
    }
}


const contact = async (req, res) => {
    try {
        const {id} = req.params
        const contact = await Contact.findOne({_id: id})

        return res.status(200).json({message: "Successfully fetched contacts", contact})
    } catch (error) {
        console.log("Error showing contacts", error);
        return res.status(500).json({message: error})
    }
}
const updateContact = async (req, res) => {
    try {
        const {id} = req.params
        const updatedContact = await Contact.findOneAndUpdate({_id: id}, {...req.body}, {new: true})

        return res.status(201).json({message: "Successfully updated contact", updatedContact})
    } catch (error) {
        console.log("Error showing contacts", error);
        return res.status(500).json({message: error})
    }
}

const deleteContact = async (req, res) => {
    try {
        const {id} = req.params;
        const contact = await Contact.findOne({_id: id})
        if (!contact) {
            return res.status(404).json({message: "No contact exists"})
        }
        await Contact.findByIdAndDelete({_id: id})
        const updatedContacts = await Contact.find({postedBy: req.user.id})

        return res.status(200).json({message: "Contact deleted successfully", contacts: updatedContacts})
    } catch (error) {
        console.log("Error deleting contact", error);
        return res.status(500).json({message: error})
    }
}

export {addContact, contacts, contact, updateContact, deleteContact};