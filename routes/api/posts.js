const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      // build new post
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "No such post" });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    if (!error.kind === "ObjectId") {
      return res.status(404).json({ msg: "No such post" });
    }
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/posts/:id
// @desc    DELETE post by id
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "No such post" });
    }

    // Check if user created that post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await post.remove();
    res.json({ msg: "Post deleted" });
  } catch (error) {
    console.error(error);
    if (!error.kind === "ObjectId") {
      return res.status(404).json({ msg: "No such post" });
    }
    res.status(500).send("Server error");
  }
});

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if post already liked by this user
    if (post.like.find((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Already liked this post" });
    }
    post.like.unshift({ user: req.user.id });
    await post.save();
    res.json(post.like);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if post not already liked by this user
    if (!post.like.find((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "User not yet liked the post" });
    }
    console.log(post);
    post.like = post.like.filter(
      (like) => like.user.toString() !== req.user.id
    );
    await post.save();
    res.json(post.like);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const post = await Post.findById(req.params.id);

      const newComment = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      };

      post.comment.unshift(newComment);
      await post.save();
      res.json(post.comment);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    Delete a comment
// @access  Private
router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    // Locate the comment
    const commentIdx = post.comment.findIndex(
      (com) => com.id === req.params.comment_id
    );
    // If comment does not exist
    if (commentIdx === -1) {
      return res.status(400).send({ msg: "No such comment" });
    }
    // Check is user made that comment
    if (post.comment[commentIdx].user.toString() !== req.user.id) {
      return res.status(401).send({ msg: "User not authorized" });
    }
    // Remove that comment
    post.comment.splice(commentIdx, 1);
    await post.save();
    res.json(post.comment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
