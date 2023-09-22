import request from "supertest";
import { describe } from "@jest/globals";
import app from "../../app";

describe.skip("Team creation", () => {
    test("Unauthorized access", async () => {
        const res = await request(app).post("/api/v1/team").send({
            teamName: "test",
            teamCategory: "test",
            description: "test",
            goal: "test",
        });
        expect(res.statusCode).toBe(401);
        expect(res.body.errorMessages).toBeDefined();
    });

    test("Successful response", async () => {
        const res = await request(app)
            .post("/api/v1/team")
            .set(
                "authorization",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTUzMTEyODAsImV4cCI6MTY5NTM5NzY4MH0.rpNf2Rnx6ZaenkmilpVDQ07Fp3Xh4TFplULugdiBYLU",
            )
            .send({
                teamName: "test",
                teamCategory: "test",
                description: "test",
                goal: "test",
            });
        expect(res.statusCode).toBe(200);
    });

    test("Validation Error", async () => {
        const res = await request(app)
            .post("/api/v1/team")
            .set(
                "authorization",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTUzMTEyODAsImV4cCI6MTY5NTM5NzY4MH0.rpNf2Rnx6ZaenkmilpVDQ07Fp3Xh4TFplULugdiBYLU",
            )
            .send({
                teamName: 333,
                teamCategory: "test",
                description: "test",
                goal: "test",
            });
        expect(res.statusCode).toBe(400);
    });
});

describe.skip("Team update", () => {
    test("Unauthorized access", async () => {
        const res = await request(app).patch("/api/v1/team/1").send({
            teamName: "333",
            teamCategory: "test",
            description: "test",
            goal: "test",
        });
        expect(res.statusCode).toBe(401);
    });

    test("Course not found", async () => {
        const res = await request(app)
            .patch("/api/v1/team/1")
            .set(
                "authorization",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTUzMTEyODAsImV4cCI6MTY5NTM5NzY4MH0.rpNf2Rnx6ZaenkmilpVDQ07Fp3Xh4TFplULugdiBYLU",
            )
            .send({
                teamName: "333",
                teamCategory: "test",
                description: "test",
                goal: "test",
            });
        expect(res.statusCode).toBe(404);
    });

    test("Successfully updated", async () => {
        const res = await request(app)
            .patch("/api/v1/team/4")
            .set(
                "authorization",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTUzMTEyODAsImV4cCI6MTY5NTM5NzY4MH0.rpNf2Rnx6ZaenkmilpVDQ07Fp3Xh4TFplULugdiBYLU",
            )
            .send({
                teamName: "333",
                teamCategory: "test",
                description: "test",
                goal: "test",
            });
        expect(res.statusCode).toBe(200);
    });

    test("Validation Error", async () => {
        const res = await request(app)
            .patch("/api/v1/team/4")
            .set(
                "authorization",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTUzMTEyODAsImV4cCI6MTY5NTM5NzY4MH0.rpNf2Rnx6ZaenkmilpVDQ07Fp3Xh4TFplULugdiBYLU",
            )
            .send({
                teamName: 333,
            });
        expect(res.statusCode).toBe(400);
    });
});

describe.skip("Delete team", () => {
    test("Not Found", async () => {
        const res = await request(app)
            .delete("/api/v1/team/500")
            .set(
                "authorization",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTUzMTEyODAsImV4cCI6MTY5NTM5NzY4MH0.rpNf2Rnx6ZaenkmilpVDQ07Fp3Xh4TFplULugdiBYLU",
            );

        expect(res.statusCode).toBe(404);
    });

    test("Auth Error", async () => {
        const res = await request(app).delete("/api/v1/team/4");
        expect(res.statusCode).toBe(401);
    });

    test("Success", async () => {
        const res = await request(app)
            .delete("/api/v1/team/4")
            .set(
                "authorization",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTUzMTEyODAsImV4cCI6MTY5NTM5NzY4MH0.rpNf2Rnx6ZaenkmilpVDQ07Fp3Xh4TFplULugdiBYLU",
            );
        expect(res.statusCode).toBe(200);
    });
});
