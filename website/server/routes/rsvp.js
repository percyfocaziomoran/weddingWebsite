//Percy Focazio-Moran

const express = require("express");
const router = express.Router();
const Guest = require("../models/Guest");
const GuestList = require("../models/GuestList");
const escapeRegex = require("../utils/escapeRegex");
const requireAdmin = require("../utils/requireAdmin");
const sendEmail = require("../utils/sendEmail");

//Builds the confirmation email text/html from a saved guest document.
function buildConfirmation(guest) {
  const lines = guest.attending
    ? [
        `Hi ${guest.name},`,
        "",
        "Thank you for your RSVP to Elliott & Percy's wedding!",
        "",
        `Guests attending: ${guest.amountAttending || 1}`,
        guest.food ? `Meal choice: ${guest.food}` : null,
        guest.dietary ? `Dietary needs: ${guest.dietary}` : null,
        "",
        "18 September 2027 — Cork, Ireland. We can't wait to see you!",
        "",
        "If you need to change anything, just RSVP again with the same email.",
      ]
    : [
        `Hi ${guest.name},`,
        "",
        "Thanks for letting us know you can't make it — we'll miss you!",
        "",
        "If your plans change, you can RSVP again with the same email.",
      ];
  const text = lines.filter((l) => l !== null).join("\n");
  return {
    to: guest.email,
    subject: "Your wedding RSVP is confirmed",
    text,
    html: `<p>${text.replace(/\n/g, "<br>")}</p>`,
  };
}

//Sends the guest their confirmation, and optionally notifies the couple.
//Fire-and-forget: a failed email must never break the RSVP itself.
function sendConfirmations(guest) {
  sendEmail(buildConfirmation(guest)).catch((e) =>
    console.error("Confirmation email failed:", e.message),
  );
  if (process.env.COUPLE_EMAIL) {
    sendEmail({
      to: process.env.COUPLE_EMAIL,
      subject: `New RSVP: ${guest.name}`,
      text: `${guest.name} (${guest.email}) responded: ${
        guest.attending ? `attending, ${guest.amountAttending || 1} guest(s)` : "not attending"
      }.`,
    }).catch((e) => console.error("Couple notification failed:", e.message));
  }
}

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

    const email = req.body.email.toLowerCase().trim();
    const payload = { ...req.body, email };
    if (!payload.food) delete payload.food; //empty meal choice would fail the enum

    //Update the RSVP if this email already responded, otherwise create it.
    //This lets guests re-submit to change their answer (as the email invites).
    const guest = await Guest.findOneAndUpdate({ email }, payload, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    });

    sendConfirmations(guest); //email the guest (and couple) — non-blocking
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
    sendConfirmations(guest); //send an updated confirmation on edits too
    res.json({ message: "RSVP updated :) ", guest });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
