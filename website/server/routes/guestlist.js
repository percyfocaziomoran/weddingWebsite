//Percy Focazio-Moran

const express = require("express");
const router = express.Router();
const GuestList = require("../models/GuestList");

//Search by email
router.get("/:email", async (req, res) => {
  try {
    const guest = await GuestList.findOne({
      email: req.params.email.toLowerCase().trim(),
    });
    if (!guest)
      return res.status(404).json({
        error:
          "Email not found on the guest list. If you think this was a mistake, please email elliottpercy2027@gmail.com with your name. ",
      });
    res.json(guest);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;

//Guest list is seeded via server/seedGuestList.js (run: node server/seedGuestList.js).
//There is intentionally no public write route — the only endpoint here is read-only lookup by email.
