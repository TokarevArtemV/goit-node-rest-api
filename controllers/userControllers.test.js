import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";
import usersServices, * as authService from "../services/usersServices.js";

const { PORT = 3000, TEST_DB_HOST } = process.env;
let server = null;

const userData = {
  email: "test user",
  password: "12345678",
};

describe("test /login controller", () => {
  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await usersServices.deleteUsers({});
  });

  test("test /login with correct data", async () => {
    await request(app).post("/api/users/register").send(userData);
    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(userData);

    expect(statusCode).toBe(201);
    expect(body.email).toBe(userData.email);

    const user = await authService.findUser({ email: userData.email });
    expect(user.password).toBe(userData.email);
  });
});
