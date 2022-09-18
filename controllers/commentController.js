const Comments = require("../models/comments");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Posts = require("../models/posts");

exports.getComment = catchAsync(async (req, res, next) => {
  const postid = req.params.postid;
  if (!postid) {
    next(new AppError("Invalid postid !", 400));
  }
  const allComments = await Comments.find();
  const postComments = allComments.filter((item) => item.postid === postid);
  if (postComments === null) {
    next(new AppError("This post has no existing comment !", 400));
  }

  res.status(200).json({
    status: "success",
    result: postComments.length,
    data: postComments,
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  const { postid, userid, username, comment } = req.body;
  const newcomment = await Comments.create({
    postid,
    userid,
    username,
    comment,
  });

  const updatedpost = await Posts.findByIdAndUpdate(postid, {
    $inc: { comment: 1 },
  });
  res.status(200).json({
    status: "success",
    data: newcomment,
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const comment = req.params.commentid;
  const delcomment = await Comments.findByIdAndDelete(comment);
  if (delcomment === null) {
    next(new AppError("comment does not exist !", 400));
  }
  res.status(200).json({
    status: "success",
    data: `comment ${delcomment._id} deleted successfully`,
  });
});
