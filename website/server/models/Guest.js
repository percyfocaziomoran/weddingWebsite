//Percy Focazio-Moran

const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  attending: { type: Boolean, required: true },
  amountAttending: { type: Number, min: 1, default: 1 },
  dietary: { type: String, default: "" },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Guest", guestSchema);
