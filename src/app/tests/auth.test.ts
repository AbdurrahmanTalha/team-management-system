import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import app from "../../app";

describe("/api/v1/auth/register", () => {
    test("Given username, password, email, role", async () => {
        const res = await request(app).post("/api/v1/auth/register").send({
            username: "Jest Test",
            password: "abcd",
            email: "jest-test@gmail.com",
            role: "Admin",
        });
        expect(res.statusCode).toBe(200);
    });
});
