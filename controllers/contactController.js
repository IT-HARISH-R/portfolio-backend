import Contact from '../models/Contact.js';
import sendEmail from '../utlis/email.js';

export const submitContactForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        console.log({ name, email, message })

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        console.log("All fields done")
        const newContact = new Contact({ name, email, message });
        console.log("add database done")

        await sendEmail({ name, email, message });
        console.log("Send mail done")


        await newContact.save();
        console.log("Cntact Save done")
        console.log("Send REsponse done")

        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
