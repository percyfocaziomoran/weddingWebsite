//Percy Focazio-Moran

const express = require("express");
const router = express.Router();
const Guest = require("../models/Guest");

//Submit RSVP
router.post("/", async (req, res) => {
  try {
    const guest = new Guest(req.body);
    await guest.save();
    res.status(201).json({ message: "RSVP received!", guest });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//look up rsvp by email
router.get("/:email", async (req, res) => {
  try {
    const guest = await Guest.findOne({ email: req.params.email });
    if (!guest) return res.status(404).json({ error: "RSVP not found :(" });
    res.json(guest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const guest = await Guest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!guest) return res.status(404).json({ error: "RSVP not found :( " });
    res.json({ message: "RSVP updated :) ", guest });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
