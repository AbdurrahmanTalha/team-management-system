import { describe, test } from "@jest/globals";
import request from "supertest";
import app from "../../app";

describe.skip("Invitation creation", () => {
    test("Unauthorized access", async () => {
        const res = await request(app).post("/api/v1/invitations").send({
            email: "abduraasaar444aaa4assshmantsalha.dev@gmail.com",
            teamId: 5,
            role: "Developer",
        });
        expect(res.statusCode).toBe(401);
    });

    test("Successful response", async () => {
        const res = await request(app)
            .post("/api/v1/invitations")
            .set(
                "authorization",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTUzMTEyODAsImV4cCI6MTY5NTM5NzY4MH0.rpNf2Rnx6ZaenkmilpVDQ07Fp3Xh4TFplULugdiBYLU",
            )
            .send({
                email: "admin.dev@gmail.com",
                teamId: "5",
                role: "Developer",
            });
        expect(res.statusCode).toBe(200);
    });

    test("Validation Error", async () => {
        const res = await request(app)
            .post("/api/v1/invitations")
            .set(
                "authorization",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTUzMTEyODAsImV4cCI6MTY5NTM5NzY4MH0.rpNf2Rnx6ZaenkmilpVDQ07Fp3Xh4TFplULugdiBYLU",
            )
            .send({
                email: "admin.dev@gmail.com",
                teamId: 5,
                role: "Developer",
            });
        expect(res.statusCode).toBe(400);
    });
});

describe.skip("Deny Invitation", () => {
    test("Unauthorized access", async () => {
        const res = await request(app).delete("/api/v1/invitations/9").set("authorization", "");
        expect(res.statusCode).toBe(401);
    });

    test("Invitation not found", async () => {
        const res = await request(app).delete("/api/v1/invitations/1231312");
        expect(res.statusCode).toBe(404);
    });

    test("Successfully deny", async () => {
        const res = await request(app).delete("/api/v1/invitations/9");
        expect(res.statusCode).toBe(200);
    });
});

describe("Accept Invitation", () => {
    test("Unauthorized access", async () => {
        const res = await request(app).patch("/api/v1/invitations/9");
        expect(res.statusCode).toBe(401);
    });

    test("Invitation not found", async () => {
        const res = await request(app)
            .patch("/api/v1/invitations/1231312")
            .set(
                "authorization",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTUzMTEyODAsImV4cCI6MTY5NTM5NzY4MH0.rpNf2Rnx6ZaenkmilpVDQ07Fp3Xh4TFplULugdiBYLU",
            );
        expect(res.statusCode).toBe(404);
    });

    test("Successfully accept", async () => {
        const res = await request(app)
            .patch("/api/v1/invitations/9")
            .set(
                "authorization",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTUzMTEyODAsImV4cCI6MTY5NTM5NzY4MH0.rpNf2Rnx6ZaenkmilpVDQ07Fp3Xh4TFplULugdiBYLU",
            );
        expect(res.statusCode).toBe(200);
    });
});
