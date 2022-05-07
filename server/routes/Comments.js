const express = require("express");
const router = express.Router();
const { Comments } = require("../models");

// Retrieve the comments from a post
router.get("/:postId", (req, res) => {
  const postId = req.params.postId;

  Comments.findAll({ where: { PostId: postId } })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({
          message: `Cannot find comments with PostId=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message + ". Error retrieving Comments with PostId=" + id,
      });
    });
});

// Create a new comment
router.post("/", (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).json({
      message: "Comment can not be empty!",
    });
    return;
  }
  // Get Post data from fronted
  const comment = req.body;
  // Save Post in the database
  Comments.create(comment)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the comment.",
      });
    });
});

module.exports = router;
