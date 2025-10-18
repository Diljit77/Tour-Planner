import express from "express";

import { getTrips, createTrip, deleteTrip } from "../controller/tripController.js";
import { auth } from "../middleware/authmiddleware.js";

const router = express.Router();

router.use(auth);

router.get("/", getTrips);
router.post("/", createTrip);
router.delete("/:id", deleteTrip);

export default router;
