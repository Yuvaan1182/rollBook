const emailOtpTemplate = (otp, type = "signup") => {
  const isSignup = type === "signup";
  const heading = isSignup ? "Verify Your Email" : "Login Verification";
  const description = isSignup
    ? "Use the following OTP to verify your email address:"
    : "Use the following OTP to complete your login:";

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${heading}</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f5f5f5; font-family:sans-serif;">
      <div style="max-width:600px; margin:40px auto; background-color:#ffffff; padding:30px; border-radius:8px; box-shadow:0 0 10px rgba(0,0,0,0.05); text-align: center;">
        <h2 style="color:#3b1c32; margin-top:0; background: #3b1c32; padding: .7rem; color: white; text-align: center; border-radius: 4px;">${heading}</h2>
        <p style="font-size:16px; color:#333; ">${description}</p>
        <div style="font-size:36px; font-weight:bold; color:#c3073f; text-align:center; margin:20px 0;">${otp}</div>
        <p style="font-size:14px; color:#555; margin-top:20px; line-height:1.6;">
          This OTP is valid for <strong>5 minutes</strong>. Do not share this code with anyone.
          If you didn’t request this, you can safely ignore this message.
        </p>
      </div>
    </body>
    </html>
  `;
};

const subscriptionConfirmationTemplate = (
  customerName,
  planName,
  nextBillingDate,
) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Subscription Confirmation</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f8f9fa; font-family:Arial, sans-serif;">
      <div style="max-width:600px; margin:30px auto; background-color:#ffffff; padding:20px; border-radius:8px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
        <h1 style="color:#ffffff; background:#3b1c32; padding:0.7rem; text-align:center; border-radius:4px; margin:0;">
          Subscription Confirmed ✅
        </h1>
        <p style="font-size:16px; color:#333333; margin-top:20px;">Hi <strong>${customerName}</strong>,</p>
        <p style="font-size:16px; color:#333333;">Thank you for subscribing to <strong>${planName}</strong> 🎉</p>
        <p style="font-size:16px; color:#333333;">Your plan: <strong>${planName}</strong></p>
        <p style="font-size:16px; color:#333333;">Next billing date: <strong>${nextBillingDate}</strong></p>
        <p style="font-size:15px; color:#555555;">You now have full access to all premium features. We’re excited to have you on board!</p>

        <p style="font-size:12px; color:#999999; text-align:center; margin-top:30px;">
          © ${new Date().getFullYear()} Your Company Name. All rights reserved.<br/>
          If you have any questions, reply to this email or contact us at 
          <a href="mailto:support@invoxyhub.com" style="color:#c3073f;">support@invoxyhub.com</a>.
        </p>
      </div>
    </body>
    </html>
  `;
};

module.exports = { emailOtpTemplate, subscriptionConfirmationTemplate };
