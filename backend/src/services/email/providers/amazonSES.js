// const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

// const client = new SESClient({ region: "us-east-1" });

// const sendViaAmazonSES = async (payload) => {
//   try {
//     const { to, from, subject, html, text } = payload;
//     const command = new SendEmailCommand({
//       Source: from,
//       Destination: {
//         ToAddresses: [to],
//       },
//       Message: {
//         Subject: { Data: subject },
//         Body: {
//           Text: { Data: text },
//           Html: { Data: html },
//         },
//       },
//     });

//     await client.send(command);
//   } catch (err) {
//     console.error("Amazon SES send error:", err);
//     throw err;
//   }
// };

// module.exports = sendViaAmazonSES;
