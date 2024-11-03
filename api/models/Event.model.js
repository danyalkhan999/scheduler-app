import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  start_time: {
    type: Number,
    required: true,
    min: 0,
    max: 23,
  },
  end_time: {
    type: Number,
    required: true,
    min: 0,
    max: 23,
    validate: {
      validator: function (value) {
        return value > this.start_time;
      },
      message: "end_time must be greater than start_time",
    },
  },
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled"],
    default: "scheduled",
  },
});

export const Event = mongoose.model("Event", eventSchema);
