const express = require("express");
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getUserPost,
} = require("../controllers/postController");
const { isUserAuthenticated } = require("../controllers/authController");

const router = express.Router();


router.route('/:userid').get(isUserAuthenticated, getUserPost);


router
  .route("/:postid")
  .delete(isUserAuthenticated, deletePost)
  .patch(isUserAuthenticated, updatePost);

router
  .route("/")
  .get(isUserAuthenticated, getAllPosts)
  .post(isUserAuthenticated, createPost);

module.exports = router;
