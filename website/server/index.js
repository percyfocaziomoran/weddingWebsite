//

//configure cors() using https://expressjs.com/en/resources/middleware/cors.html
var express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");

// Load .env variables FIRST, before anything else uses them
dotenv.config();
const app = express();

// Adds headers: Access-Control-Allow-Origin: *
//this iswhat allows react app to talk to server
app.use(cors());

//this is parsing json requests
app.use(express.json());

//routes here
const rsvpRoutes = require("./routes/rsvp");
const guestListRoutes = require("./routes/guestlist");
app.use("/api/rsvp", rsvpRoutes);
app.use("/api/guestlist", guestListRoutes);

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 1818;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
