/** ***************** RESEND FOR DEV TESTING ********************** */
/**
 * Use Resend's test email addresses: During development, 
 * you can send emails to special test addresses that Resend provides:
 * delivered@resend.dev - simulates successful delivery
 * bounced@resend.dev - simulates bounced emails
 * complained@resend.dev - simulates spam complaints
 * Default "from" address: For development, 
 * you can use onboarding@resend.dev as your "from" address without needing to verify any domain.
 * Localhost development: You can run your application on localhost 
 * and send emails through Resend's APIwithout any domain verification.
 */

const { Resend } = require("resend");
const resendEnv = require("../../../config/env.config").emailProviders.resend;

const resend = new Resend(resendEnv.apiKey);

async function sendViaResend(payload) {
  try {
    const { to, from, subject, html, text } = payload;
    console.log(`Sending email to: ${to}: from: ${from}, subject: ${subject}`);
    
    const { data, error } = await resend.emails.send({ to, from, subject, html, text });
    if (error) throw new Error(`Resend Error: ${error.message}`);
    return data;
  } catch (err) {
    console.error('Resend send error:', err);
    throw err;
  }
}

module.exports = sendViaResend;