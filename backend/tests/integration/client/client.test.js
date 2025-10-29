import request from "supertest";
import app from "../../../src/app.js";
import { dbConnect, dbDisconnect, dbCleanup } from "../../setup/db.setup.js";
import { createTestClient } from "../../utils/factory.utils.js";
import { generateTestToken } from "../../utils/auth.utils.js";
import { describe, beforeAll, afterAll, afterEach, test, expect } from "vitest";

describe("Client API Integration (Protected Routes)", () => {
  let token;

  beforeAll(async () => {
    await dbConnect();
    token = generateTestToken(); // Generate a valid JWT
  });

  afterAll(async () => await dbDisconnect());
  afterEach(async () => await dbCleanup());

  test("POST /api/v1/client → creates a new client when authorized", async () => {
    const clientPayload = createTestClient();

    const res = await request(app)
      .post("/api/client")
      .set("Authorization", `Bearer ${token}`)
      .send(clientPayload)
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe(clientPayload.name);
  });

  test("GET /api/clients → returns 401 without token", async () => {
    const res = await request(app).get("/api/clients").expect(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/token/i);
  });

  test("GET /api/clients → fetches all clients with valid token", async () => {
    await request(app)
      .post("/api/clients")
      .set("Authorization", `Bearer ${token}`)
      .send(createTestClient());

    const res = await request(app)
      .get("/api/clients")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(res.body.data.length).toBe(1);
  });
});
