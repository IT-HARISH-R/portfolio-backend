import nodemailer from 'nodemailer';
import { EMAIL, PASS } from './config.js';


const sendEmail = async ({ name, email, message ,}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASS,
        },
    });

    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: 'harishmass27.8@gmail.com',
        subject: 'New Contact Message from Portfolio',
        html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f8f8f8; border-radius: 10px;">
        <h2 style="color: #0d6efd;">Portfolio Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="margin-top: 10px; background: #fff; padding: 15px; border-left: 5px solid #0d6efd;">
          ${message}
        </div>
        <p style="margin-top: 20px; font-size: 0.9rem; color: #888;">This message was sent via your portfolio contact form.</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;
