import express from "express";
import { auth } from "../middleware/authmiddleware.js";
import { getTrips, createTripWithItinerary, deleteTrip, getTripById } from "../controller/tripController.js";
import { getPopularTrips } from "../controller/discoverController.js";

const router = express.Router();
router.get("/popular", getPopularTrips); 
router.use(auth);

router.get("/", getTrips);

router.get("/:id", auth, getTripById);
router.post("/save", createTripWithItinerary); 
router.delete("/:id", deleteTrip);

export default router;
