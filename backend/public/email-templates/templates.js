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

module.exports = { emailOtpTemplate };
