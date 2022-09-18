const express = require("express");
const {
  getComment,
  createComment,
  deleteComment,
} = require("../controllers/commentController");

const { isUserAuthenticated } = require("../controllers/authController");

const router = express.Router();

router.route("/:commentid").delete(isUserAuthenticated, deleteComment);
router.route("/:postid").get(isUserAuthenticated, getComment);
router.route("/").post(isUserAuthenticated, createComment);

module.exports = router;
