const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); // generate a unique id for each video

router.get("/", (req, res) => {
  console.log("GET /videos");
});

module.exports = router; // export the router
