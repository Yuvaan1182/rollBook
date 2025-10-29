import { describe, it, expect, vi } from "vitest";

// 1️⃣ Mock Stripe import before loading config
vi.mock("../../../src/config/stripe.config.js", async () => {
  const { mockStripe } = await import("../../mocks/stripe.mock.js");
  return { default: mockStripe };
});

// 2️⃣ Import after mock
import stripe from "../../../src/config/stripe.config.js";

describe("Stripe Integration (Mocked)", () => {
  it("should return a mock payment intent", async () => {
    const res = await stripe.paymentIntents.create({
      amount: 1000,
      currency: "usd",
    });
    expect(res.id).toBe("pi_test_123");
    expect(res.status).toBe("succeeded");
  });
});
