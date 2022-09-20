const mongoose = require("mongoose");


const PostSchema = mongoose.Schema({
  userid: {
    type: String,
    required: [true, "Empty userid "],
  },
  username: {
    type: String,
    required: [true, "Empty username "],
  },
  content:{
    type: String,
    required: [true, 'Cannot Post Empty Comment']
  },
  date: {
    type: Date,
  },
  comment: {
    type: Number,
    default: 0
  }
});



//convert schema to model

module.exports = mongoose.model("posts", PostSchema);
