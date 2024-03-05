const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); // generate a unique id for each video

router.get("/", (req, res) => {
  res.send("Welcome to the video routes");
});

module.exports = router; // export the router
