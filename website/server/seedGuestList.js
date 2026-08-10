require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");
const GuestList = require("./models/GuestList");

const guests = [
  { name: "Terry Moran", email: "trmoran@dcentral.org", maxGuests: 1 },
  { name: "Lashel Devich", email: "lashel@gmail.com", maxGuests: 1 },
  { name: "Clare and Robin O'Flynn", email: "robin@gmail.com", maxGuests: 1 },
  {
    name: "Percy Focazio-Moran",
    email: "percy@focazio-moran.com",
    maxGuests: 1,
  },
  { name: "Elliott Mulhall", email: "mx.mulhall@gmail.com", maxGuests: 1 },
];

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await GuestList.deleteMany({});
  await GuestList.insertMany(guests);
  console.log(`Seeded ${guests.length} guests`);
  await mongoose.disconnect();
})();
