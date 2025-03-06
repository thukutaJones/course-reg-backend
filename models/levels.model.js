const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Level name can not be empty"],
      unique: [true, "Level name already in use"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Level", LevelSchema);
