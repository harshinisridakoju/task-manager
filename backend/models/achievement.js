const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    icon: { type: String, default: "🏆" },
    unlockedAt: { type: Date, default: Date.now },
    type: {
      type: String,
      enum: ["task_milestone", "streak", "productivity", "collaboration", "custom"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Achievement", achievementSchema);
