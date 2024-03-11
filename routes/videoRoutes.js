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

const randomAnimal = uniqueNamesGenerator({
  dictionaries: [adjectives, colors, animals],
  length: 3,
  separator: " ",
  style: "capital",
});

const randomCountry = uniqueNamesGenerator({
  dictionaries: [countries],
  length: 1,
  style: "capital",
});

// read the video-details.json file
const videoDetails = fs.readFileSync("./data/video-details.json", "utf-8");
// parse the JSON data
const videoDetailsArray = JSON.parse(videoDetails);

// GET /videos responds woth an array of videos
router.get("/", (req, res) => {
  // res.json to send the video details array as a JSON response
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

// POST /videos that will add a new video to the video list.
router.post("/", (req, res) => {
  // get the title and description from the request body
  const { title, description } = req.body;
  // create a new video object
  const newVideo = {
    id: uuidv4(), // generate a unique id
    title,
    channel: `${randomAnimal} @${randomCountry}`,
    image: "http://localhost:8080/images/Upload-video-preview.jpg",
    description,
    views: "0",
    likes: "0",
    // random duration between 0 and 10 minutes
    duration: `${Math.floor(Math.random() * 30)}:${Math.floor(
      Math.random() * 60
    )
      .toString()
      .padStart(2, "0")}`,
    video:
      "https://unit-3-project-api-0a5620414506.herokuapp.com/stream?api_key=9e7356d6-6bef-4279-aa6a-97eaa4015029",
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

// POST /videos/:id/comments that will add a new comment to the video with the specified video id.
router.post("/:id/comments", (req, res) => {
  // get the id from the request params
  const { id } = req.params;

  // get the comment from the request body
  const { comment } = req.body;

  // find the video with the id
  const video = videoDetailsArray.find((video) => video.id === id);

  // create a new comment object
  const newComment = {
    id: uuidv4(),
    name: `${randomAnimal} @${randomCountry}`,
    comment,
    likes: 0,
    timestamp: Date.now(),
  };

  // add the new comment to the top of the video comments array
  video.comments.unshift(newComment);

  // write the new video details array to the video-details.json file
  fs.writeFileSync(
    "./data/video-details.json",
    JSON.stringify(videoDetailsArray, null, 2)
  );

  // respond with the new commemt under the video
  res.json(newComment);
});

// DELETE /videos/:videoId/comments/:commentId that will delete the comment with the specified comment id from the video with the specified video id.
router.delete("/:videoId/comments/:commentId", (req, res) => {
  // get the video id and comment id from the req params
  const { videoId, commentId } = req.params;

  // find the video with the id
  const video = videoDetailsArray.find((video) => video.id === videoId);

  // find the comment with the comment id
  const commentToDelete = video.comments.find(
    (comment) => comment.id === commentId
  );

  // get the index of the comment
  const idx = video.comments.indexOf(commentToDelete); // return -1 if not found

  // remove the comment from the video comments array
  video.comments.splice(idx, 1);

  // write the new video details array to the video-details.json file
  fs.writeFileSync(
    "./data/video-details.json",
    JSON.stringify(videoDetailsArray, null, 2)
  );

  // respond with the updated video details
  res.json(video);
});

module.exports = router; // export the router
