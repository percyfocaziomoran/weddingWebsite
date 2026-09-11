//

//configure cors() using https://expressjs.com/en/resources/middleware/cors.html
var express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");

// Load .env variables FIRST, before anything else uses them.
// Point at server/.env explicitly so it works no matter which folder you run from.
dotenv.config({ path: __dirname + "/.env" });
const app = express();

// Adds headers: Access-Control-Allow-Origin: *
//this iswhat allows react app to talk to server
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  allowedHeaders: ["Content-Type", "x-admin-secret"],
}));

//this is parsing json requests
app.use(express.json());

//routes here
const rsvpRoutes = require("./routes/rsvp");
const guestListRoutes = require("./routes/guestlist");
app.use("/api/rsvp", rsvpRoutes);
app.use("/api/guestlist", guestListRoutes);

const mongoose = require("mongoose");

const PORT = process.env.PORT || 1818;

// Connect to MongoDB FIRST, and only start listening once it succeeds.
// If the DB is unreachable, log loudly and exit instead of serving broken requests.
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("\nFATAL: could not connect to MongoDB.");
    console.error(err.message);
    console.error(
      "Check that MONGODB_URI is set in server/.env and your IP is allowlisted in Atlas.\n",
    );
    process.exit(1);
  });
