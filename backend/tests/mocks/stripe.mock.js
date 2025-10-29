import { vi } from "vitest";

export const mockStripe = {
  paymentIntents: {
    create: vi.fn().mockResolvedValue({
      id: "pi_test_123",
      amount: 1000,
      currency: "usd",
      status: "succeeded",
    }),
  },
};
