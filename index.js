const express = require("express");
const cors = require("cors"); // cross-origin resource sharing
const app = express(); // create an instance of express
const videoRoutes = require("./routes/videoRoutes"); // import the video routes from the routes folder
require("dotenv").config(); // load environment variables from a .env file into process.env
const { v4: uuidv4, v4 } = require("uuid"); 

const { PORT, HOST } = process.env; // get the port and host

// middleware
app.use(cors({
  origin: "https://obscure-train-j9wvwpxp66x2grv-3000.app.github.dev",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",

})); // enable CORS
app.use(express.json()); // parse JSON bodies
app.use(express.static("public")); // serve static files from the public directory

// routes
app.use("/videos", videoRoutes); // use the video routes


// let user register unique api key
app.get("/register", (req, res) => {
  res.json({
    "api_key": v4()
  })
})

// query user api key to get the video details


app.get("/", (req, res) => {
  res.json({
    "message": "Welcome to the BrainFlix API"
  })
});

app.get("/about", (req, res) => {
  res.json({
    "message": "This is the ABOUT page for the BrainFlix API"
  })
});

app.listen(PORT, () => {
  console.log(`🥳 Server is firing on http://localhost:${PORT}`);
});
