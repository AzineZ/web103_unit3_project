import express from "express";
import { getAllLocations, getLocationById } from "../controllers/locations.js";
import { getEventsByLocation } from "../controllers/events.js";

const router = express.Router();

router.get("/", getAllLocations);

router.get("/:locationId/events", getEventsByLocation);

router.get("/:id", getLocationById);

export default router;
