import express from "express";

import { generateAIItinerary } from "../controller/aiController.js";

const router = express.Router();

router.post("/generate", generateAIItinerary);

export default router;
