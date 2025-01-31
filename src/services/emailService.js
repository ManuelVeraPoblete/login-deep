// src/services/emailService.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

class EmailService {
  static async sendConfirmationEmail(email, token) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirm your email',
      text: `Please confirm your email by clicking on the following link: http://yourapp.com/confirm-email?token=${token}`
    };
    await transporter.sendMail(mailOptions);
  }
}

module.exports = EmailService;