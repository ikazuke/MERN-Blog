const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

// Retrieve all Posts from the database
router.get("/", (req, res) => {
  Posts.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving Posts.",
      });
    });
});

// Create a new Post
router.post("/", (req, res) => {
  const post = req.body;

  Posts.create(post)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while creating the Post.",
      });
    });
});

// Retrieve a single Post from the database
router.get("/:id", (req, res) => {
  const id = req.params.id;

  Posts.findByPk(id)
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({
          message: `Cannot find Post with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message + ". Error retrieving Post with id=" + id,
      });
    });
});

module.exports = router;
