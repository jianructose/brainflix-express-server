const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); // generate a unique id for each video
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
  countries,
} = require("unique-names-generator"); // generate a unique name for each video channel

const randomName = uniqueNamesGenerator({
  dictionaries: [adjectives, colors, animals, countries],
  length: 4,
  separator: " ",
  style: "capital",
});

// read the video-details.json file
const videoDetails = fs.readFileSync("./data/video-details.json", "utf-8");
// parse the JSON data
const videoDetailsArray = JSON.parse(videoDetails);

// GET /videos responds woth an array of videos
router.get("/", (req, res) => {
  // respond with the video details
  res.json(videoDetailsArray);
});

// GET /videos/:id responds with an object containing the details of the video with an id of :id.

router.get("/:id", (req, res) => {
  // get the id from the request params
  const { id } = req.params;
  // find the video with the id
  const video = videoDetailsArray.find((video) => video.id === id);
  // respond with the founded video details
  res.json(video);
});

// POST /videos that will add a new video to the video list. a unique id must be generated for each video uploaded. User only specify title and description, so the image must be provided the hard-coded image path for the video thumbnail on the front-end during the form submission within the request body.
router.post("/", (req, res) => {
  // get the title and description from the request body
  const { title, description } = req.body;
  // create a new video object
  const newVideo = {
    id: uuidv4(), // generate a unique id
    title,
    channel: randomName,
    image: "http://localhost:8080/images/image8.jpg",
    description,
    views: "0",
    likes: "0",
    duration: "4:20",
    video: "https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
    timestamp: Date.now(),
    comments: [],
  };

  // add the new video to the end of the video details array
  videoDetailsArray.push(newVideo);

  // write the new video details array to the video-details.json file
  fs.writeFileSync(
    "./data/video-details.json",
    JSON.stringify(videoDetailsArray, null, 2)
  );

  // respond with the new video details
  res.json(newVideo);
});

module.exports = router; // export the router
