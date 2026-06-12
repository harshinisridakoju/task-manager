const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    reminderBefore: { type: Number, default: 15 },
    location: { type: String },
    color: { type: String, default: "#667eea" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
