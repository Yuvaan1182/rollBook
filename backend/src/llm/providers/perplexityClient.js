const axios = require("axios");
const { PERPLEXITY_API_KEY } = process.env;

async function generate(prompt, options = {}) {
  const response = await axios.post("https://api.perplexity.ai/v1/chat/completions", {
    model: "sonar-medium-online", // or sonar-small
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  }, {
    headers: {
      Authorization: `Bearer ${PERPLEXITY_API_KEY}`
    }
  });

  return response.data.choices[0].message.content;
}

module.exports = { generate };
