const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  postid: {
    type: String,
    required: [true, "Empty postid "],
  },
  userid: {
    type: String,
    required: [true, "Empty userid "],
  },
  username: {
    type: String,
    required: [true, "Empty username "],
  },
  comment: {
    type: String,
    required: [true, "please enter your comment !"],
  },
  date: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

//convert schema to model

module.exports = mongoose.model("comments", CommentSchema);
