//Percy Focazio-Moran

const express = require("express");
const router = express.Router();
const GuestList = require("../models/GuestList");

//Add a guest to list
router.post("/", async (req, res) => {
  try {
    const guest = new GuestList(req.body);
    await guest.save();
    res.status(201).json({ message: "Guest added to list", guest });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Search by name
router.get("/:name", async (req, res) => {
  try {
    const guest = await GuestList.findOne({
      name: { $regex: new RegExp(`^${req.params.name}$`, "i") },
    });
    if (!guest)
      return res.status(404).json({
        error:
          "Name not found on the guest list. If you think this was a mistake, please email @mailto:elliottpercy2027@gmail.com with your name. ",
      });
    res.json(guest);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;

//To make more for guest list, run this is terminal:

//curl -X POST http://localhost:1818/api/guestlist -H "Content-Type: application/json" -d '{"name": "Terry Smith", "maxGuests": 2}'
