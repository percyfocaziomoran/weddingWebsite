//Percy Focazio-Moran

const express = require("express");
const router = express.Router();
const Guest = require("../models/Guest");
const GuestList = require("../models/GuestList");
const escapeRegex = require("../utils/escapeRegex");
const requireAdmin = require("../utils/requireAdmin");

//Admin: list all RSVPs (protected by x-admin-secret header)
router.get("/", requireAdmin, async (req, res) => {
  try {
    const guests = await Guest.find().sort({ submittedAt: -1 });
    res.json(guests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const invite = await GuestList.findOne({
      email: req.body.email.toLowerCase().trim(),
    });
    if (!invite) {
      return res.status(403).json({ error: "Email not found on guest list" });
    }
    if (req.body.amountAttending > invite.maxGuests) {
      return res.status(400).json({
        error: `Your invite allows up to ${invite.maxGuests} guests.`,
      });
    }
    const guest = new Guest(req.body);
    await guest.save();
    res.status(201).json({ message: "RSVP received!", guest });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//look up rsvp by email
router.post("/lookup", async (req, res) => {
  try {
    const { name, email } = req.body;
    const guest = await Guest.findOne({
      email: email.toLowerCase().trim(),
      name: { $regex: new RegExp(`^${escapeRegex(name.trim())}$`, "i") },
    });
    if (!guest) return res.status(404).json({ error: "RSVP not found" });
    res.json(guest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Admin: delete an RSVP (protected). Handy for removing test entries.
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const guest = await Guest.findByIdAndDelete(req.params.id);
    if (!guest) return res.status(404).json({ error: "RSVP not found" });
    res.json({ message: "RSVP deleted", id: req.params.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
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
