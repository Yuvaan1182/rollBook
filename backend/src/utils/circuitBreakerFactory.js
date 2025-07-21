const opossum = require("opossum");

function createCircuitBreaker(fn, name, options) {
  const breaker = new opossum(fn, options);  

  breaker.on("open", () => console.warn(`⚠️ ${name} breaker OPEN`));
  breaker.on("close", () => console.info(`✅ ${name} breaker CLOSED`));
  breaker.on("halfOpen", () => console.info(`🔄 ${name} breaker HALF-OPEN`));
  breaker.on("reject", () => console.warn(`❌ ${name} breaker REJECTED`));

  return breaker;
}

module.exports = createCircuitBreaker;
