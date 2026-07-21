//Percy Focazio-Moran

const mongoose = require("mongoose");

const guestListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  maxGuests: { type: Number, default: 1 },
});

module.exports = mongoose.model("GuestList", guestListSchema);
