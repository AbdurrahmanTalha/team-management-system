import express from "express";
import controller from "./team.controller";

const router = express.Router();

router.post("/create-team", controller.createTeam);

export default router;
