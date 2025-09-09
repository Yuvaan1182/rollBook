// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// async function sendViaSendgrid(payload) {
//   const { to, from, subject, html, text } = payload;
//   const msg = { to, from, subject, html, text };
//   const [res] = await sgMail.send(msg);
//   if (res.statusCode >= 400) throw new Error(`SendGrid Error: ${res.statusCode}`);
//   return res;
// }

// module.exports = sendViaSendgrid;
