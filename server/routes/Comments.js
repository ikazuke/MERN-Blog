const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

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
router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  await Comments.create(comment);
  res.json(comment);
});

module.exports = router;
