// routes/googleAuthRoute.js
import express from "express";
import { googleLogin } from "../controllers/googlecontroller.js";

const router = express.Router();

router.post("/google", googleLogin);

export default router;
