import jwt from "jsonwebtoken";

// Generates a valid JWT token for testing
export const generateTestToken = (payload = {}) => {
  const defaultPayload = {
    _id: "507f191e810c19729de860ea",
    role: "admin",
  };

  return jwt.sign(
    { ...defaultPayload, ...payload },
    process.env.JWT_SECRET || "test_secret",
    { expiresIn: "1h" }
  );
};
