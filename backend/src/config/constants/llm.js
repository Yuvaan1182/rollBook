const LLM_PROVIDERS = {
  gpt: {
    name: "OpenAI GPT",
    apiKeyEnv: "OPENAI_API_KEY",
    timeout: 10000,
    retries: 2,
    baseUrl: "https://api.openai.com/v1/chat/completions",
  },
  claude: {
    name: "Anthropic Claude",
    apiKeyEnv: "CLAUDE_API_KEY",
    timeout: 12000,
    retries: 2,
    baseUrl: "https://api.anthropic.com/v1/messages",
  },
  perplexity: {
    name: "Perplexity AI",
    apiKeyEnv: "PERPLEXITY_API_KEY",
    timeout: 15000,
    retries: 3,
    baseUrl: "https://api.perplexity.ai/v1/complete",
  }
};

const DEFAULT_PROVIDER = "gpt";

module.exports = {
  LLM_PROVIDERS,
  DEFAULT_PROVIDER,
};
