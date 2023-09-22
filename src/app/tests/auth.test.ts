import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import app from "../../app";

// describe("/api/v1/auth/register", () => {
//     test("Validation Error Testing", async () => {
//         // * Expect Validation Error
//         // * Status Code 400
//         const res = await request(app).post("/api/v1/auth/register").send({
//             username: 9,
//             password: "abcd",
//             email: "jest-test@gmail.com",
//             role: "Admin",
//         });
//         expect(res.statusCode).toBe(400);
//         expect(res.body).toBeDefined();
//         expect(res.body).toHaveProperty("errorMessages");
//     });

//     test("Successful response", async () => {
//         // * Expect successful response
//         // * Status Code 400
//         const res = await request(app).post("/api/v1/auth/register").send({
//             username: "3",
//             password: "abcd",
//             email: "jesta-test@gmail.com",
//             role: "Admin",
//         });
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toBeDefined();
//         expect(res.body.errorMessages);
//     });
// });

describe("/api/v1/auth/login", () => {
    test("User Not Found", async () => {
        // * Expect user not found
        // * Status Code 400
        const res = await request(app).post("/api/v1/auth/login").send({
            password: "abcd",
            email: "not-found@gmail.com",
        });
        expect(res.statusCode).toBe(404);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveProperty("errorMessages");
    });

    test("Successful response", async () => {
        // * Expect successful response
        // * Status Code 400
        const res = await request(app).post("/api/v1/auth/login").send({
            password: "abcd",
            email: "jesta-test@gmail.com",
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
    });
});
