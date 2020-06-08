const express = require("express");
const router = express.Router();

// @route   GET api/auth
// @desc    Test route
// @access  Public - doesn't require token
router.get("/", (req, res) => {
  res.send("Auth route...");
});

module.exports = router;
