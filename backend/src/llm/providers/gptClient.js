const axios = require("axios");
const { llm } = require("../../config/env");
const { MODELS, DEFAULTS } = require("../../config/constants/llm");

const apiKey = llm.apiKeys.openai;

async function callGPT(prompt) {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: MODELS.gpt,
      messages: [{ role: "user", content: prompt }],
      max_tokens: DEFAULTS.maxTokens,
      temperature: DEFAULTS.temperature
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices[0].message.content;
}

module.exports = { callGPT };
