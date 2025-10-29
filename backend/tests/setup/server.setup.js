import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

process.env.NODE_ENV = "test";
process.env.PORT = "0";
process.env.STRIPE_SECRET_KEY = "sk_test_dummy";

// ✅ mock Stripe globally for all tests
vi.mock("stripe", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      paymentIntents: {
        create: vi
          .fn()
          .mockResolvedValue({ id: "pi_test_123", status: "succeeded" }),
      },
      customers: {
        create: vi.fn().mockResolvedValue({ id: "cus_test_123" }),
      },
    })),
  };
});
vi.spyOn(console, "log").mockImplementation(() => {});
vi.spyOn(console, "warn").mockImplementation(() => {});
vi.spyOn(console, "error").mockImplementation(() => {});
