const nodemailer = require('nodemailer');

// For dev/test: use Ethereal or Mailhog SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 1025, // Mailhog default
  auth: process.env.SMTP_USER ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  } : undefined,
  secure: false,
  ignoreTLS: true // for local dev
});

async function sendNodemailer(payload) {
  const mailOptions = {
    from: payload.from || 'noreply@example.com',
    to: payload.to,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
    attachments: payload.attachments
  };
  return transporter.sendMail(mailOptions);
}

module.exports = sendNodemailer;
