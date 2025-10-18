import express from "express";

import { addPlace, deletePlace } from "../controller/placeController.js";
import { auth } from "../middleware/authmiddleware.js";

const router = express.Router();

router.use(auth);

router.post("/:tripId", addPlace);
router.delete("/:id", deletePlace);

export default router;
