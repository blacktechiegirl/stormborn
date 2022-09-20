const Posts = require("../models/posts");
const Comments = require("../models/comments");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const allPosts = await Posts.find().sort({
    _id: -1,
    userid: -1,
    username: -1,
    content: -1,
    comment: -1,
    date:-1

  });
  res.status(200).json({
    status: "success",
    result: allPosts.length,
    data: allPosts,
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const { userid, username, content } = req.body;
  const newpost = await Posts.create({
    userid,
    username,
    content,
    comment: 0,
    date: Date.now()
  });
  res.status(200).json({
    status: "success",
    data: newpost,
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const postid = req.params.postid;
  const { content } = req.body;
  console.log(postid);
  if (!content) {
    next(new AppError("Post cannot be empty !", 400));
  }
  const updatedpost = await Posts.findByIdAndUpdate(postid, { content });
  updatedpost.content = content
  if (updatedpost === null) {
    next(new AppError("post does not exist !", 400));
  }
  res.status(200).json({
    status: "success",
    message: "post updated successfully",
    data: updatedpost,
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const postid = req.params.postid;
  const delpost = await Posts.findByIdAndDelete(postid);
  if (delpost === null) {
    next(new AppError("post does not exist !", 400));
  }
  const postComments = await Comments.find()
  postComments.map(async(item)=>{
    item.postid === postid ? await Comments.findByIdAndDelete(item._id): null
  } )
  res.status(200).json({
    status: "success",
    message: "post deleted successfully",
    data: delpost._id
  });
});

exports.getUserPost = catchAsync(async (req, res, next) => {
  const userid = req.params.userid;
  if (!userid) {
    next(new AppError("Invalid userId !", 400));
  }
  const allPosts = await Posts.find().sort({
    _id: -1,
    userid: -1,
    username: -1,
    content: -1,
    comment: -1,
    date:-1

  });;
  const userPost = allPosts.filter((item) =>  item.userid === userid);
  if (userPost === null) {
    next(new AppError("This user has no existing post !", 400));
  }
  res.status(200).json({
    status: "success",
    result: userPost.length,
    data: userPost,
  });
});
