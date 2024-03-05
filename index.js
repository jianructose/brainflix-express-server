const express = require("express");
const cors = require("cors"); // cross-origin resource sharing
const app = express(); // create an instance of express
const videoRoutes = require("./routes/videoRoutes"); // import the video routes from the routes folder
require("dotenv").config(); // load environment variables from a .env file into process.env

const { PORT, HOST } = process.env; // get the port and host

// middleware
app.use(cors()); // enable CORS
app.use(express.json()); // parse JSON bodies
app.use(express.static("public")); // serve static files from the public directory

// routes
app.use("/videos", videoRoutes); // use the video routes

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the server 🚀",
  });
});

app.get("/about", (req, res) => {
  res.json({
    message: "About the server",
  });
});

app.listen(PORT, () => {
  console.log(`🥳 Server is firing on http://localhost:${PORT}`);
});
