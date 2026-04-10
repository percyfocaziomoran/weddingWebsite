//Percy Focazio-Moran

const mongoose = require("mongoose");

const guestListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  maxGuests: { type: Number, default: 1 },
});

module.exports = mongoose.model("GuestList", guestListSchema);
