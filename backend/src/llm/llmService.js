const { llm } = require("../config/env");
const { LLM_PROVIDERS } = require("../config/constants/llm");
const { callGPT } = require("./providers/gptClient");
const { callClaude } = require("./providers/claudeClient");
const { callPerplexity } = require("./providers/perplexityClient");

function getProviderFunc(provider = llm.defaultProvider) {
  switch (provider) {
    case "gpt": return callGPT;
    case "claude": return callClaude;
    case "perplexity": return callPerplexity;
    default: return callGPT;
  }
}

async function generateProposal({ clientName, projectDesc, services }, provider) {
  const prompt = `
You're a smart assistant helping a freelancer generate proposals.

Client: ${clientName}
Project: ${projectDesc}
Services: ${services.map((s) => `- ${s}`).join("\n")}

Generate a professional proposal with sections like: Introduction, Deliverables, Pricing, Timeline.
  `;

  const fn = getProviderFunc(provider);
  return await fn(prompt);
}

async function summarizeInvoice({ clientName, total, services }, provider) {
  const prompt = `
You're a smart assistant summarizing invoices for freelancers.

Client: ${clientName}
Total Amount: $${total}
Services Rendered:
${services.map((s) => `- ${s}`).join("\n")}

Generate a short friendly summary to include in email body.
  `;

  const fn = getProviderFunc(provider);
  return await fn(prompt);
}

module.exports = {
  generateProposal,
  summarizeInvoice
};
