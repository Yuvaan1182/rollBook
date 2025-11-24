require("dotenv").config();

const { Resend } = require("resend");
const resendEnv = require("./src/config/env.config").emailProviders.resend;

const resend = new Resend(resendEnv.apiKey);

async function printResendApiKeys() {
  const result = await resend.apiKeys.list();

  const data = result?.data?.data;

  if (!Array.isArray(data) || data.length === 0) {
    console.log("No API keys found.");
    return;
  }

  console.table(
    data.map((key) => ({
      ID: key.id,
      Name: key.name,
      "Created At": key.created_at,
    }))
  );
}

async function printResendDomains() {
  const result = await resend.domains.list();
  console.log("Result:", result);

  const data = result?.data?.data;

  if (!Array.isArray(data) || data.length === 0) {
    console.log("No API keys found.");
    return;
  }

  console.table(
    data.map((key) => ({
      ID: key.id,
      Name: key.name,
      "Created At": key.created_at,
      Status: key.status,
      Region: key.region,
    }))
  );
}

printResendApiKeys();
printResendDomains();

/** This code is for seeing the routes registered to this router must be placed at the
 *  end of the file to ensure all routes are registered before logging them
 */
// console.log("✅ Auth routes loaded");

// router.stack?.forEach((r) => {
//   if (r.route) {
//     console.log("➡️", r.route.path);
//   }
// });
