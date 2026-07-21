//Diagnostic: prints every guest-list email exactly as stored, and (optionally)
//runs the same lookup the site uses.  Usage:
//   node server/checkGuests.js
//   node server/checkGuests.js someone@example.com
require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");
const GuestList = require("./models/GuestList");

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  const all = await GuestList.find();
  console.log(`\n${all.length} entries on the guest list:`);
  //Wrap in [] so trailing/leading spaces are visible
  all.forEach((g) => console.log(`  name: ${g.name}  email: [${g.email}]`));

  const test = process.argv[2];
  if (test) {
    const query = test.toLowerCase().trim();
    console.log(`\nLooking up [${query}] (same query the site runs)...`);
    const hit = await GuestList.findOne({ email: query });
    console.log(hit ? `  ✓ FOUND: ${hit.name}` : "  ✗ NOT FOUND");
  }

  await mongoose.disconnect();
})();
