//Percy Focazio-Moran

const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  attending: { type: Boolean, required: true },
  amountAttending: { type: String, default: "" },
  food: { type: String, enum: ["choice1", "choice2", "choice3"] },
  dietary: { type: String, default: "" },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Guest", guestSchema);
