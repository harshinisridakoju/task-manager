const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    progress: { type: Number, default: 0 },
    status: { type: String, enum: ["Active", "On Hold", "Completed", "Archived"], default: "Active" },
    dueDate: { type: Date },
    color: { type: String, default: "#667eea" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
