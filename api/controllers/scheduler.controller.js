import { Event } from "../models/Event.model.js";

// Add Event
export const addEvent = async (req, res) => {
  //   console.log(req.body);
  const { name, start_time, end_time } = req.body;

  try {
    const overlappingEvent = await Event.findOne({
      $or: [
        { start_time: { $lt: end_time, $gte: start_time } },
        { end_time: { $gt: start_time, $lte: end_time } },
        { start_time: { $lte: start_time }, end_time: { $gte: end_time } },
      ],
    });

    if (overlappingEvent) {
      return res.status(400).json({
        success: false,
        message: "Event overlaps with an existing one.",
      });
    }

    // Create and save the new event
    const event = new Event({
      name,
      start_time,
      end_time,
      status: "scheduled",
    });
    await event.save();
    res.status(201).json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllEvent = async (req, res) => {
  try {
    const events = await Event.find().sort({ start_time: 1 });
    // Check if any scheduled events should be marked as completed
    const currentHour = new Date().getHours();
    const updates = events
      .filter(
        (event) => event.status === "scheduled" && event.end_time <= currentHour
      )
      .map((event) =>
        Event.findByIdAndUpdate(event._id, { status: "completed" })
      );

    await Promise.all(updates); // Update all applicable events to completed

    const updatedEvents = await Event.find().sort({ start_time: 1 });
    res.status(200).json({ success: true, events: updatedEvents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEventStatus = async (req, res) => {
  //   console.log("id", req.params);

  const { id } = req.params;
  const { status } = req.body;

  if (!["completed", "cancelled"].includes(status)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid status value" });
  }

  try {
    const event = await Event.findByIdAndUpdate(id, { status }, { new: true });

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res.status(200).json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
