import express from "express";
import {
  addEvent,
  getAllEvent,
  updateEventStatus,
} from "../controllers/scheduler.controller.js";

const router = express.Router();

// add an event.
router.post("/addEvent", addEvent);

// get event
router.get("/getEvents", getAllEvent);

// update an event's status
router.patch("/updateStatus/:id", updateEventStatus);

export default router;
