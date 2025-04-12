import Contact from '../models/Contact.js';
import sendEmail from '../utlis/email.js';

export const submitContactForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        console.log({ name, email, message })
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newContact = new Contact({ name, email, message });

        await sendEmail({ name, email, message });


        await newContact.save();

        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
