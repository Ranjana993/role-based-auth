
const Post = require("../models/post_model")

const createPost = async (req, res) => {
  try {
    const { title, description } = req.body
    console.log(req.body);

    if (!(title || description)) {
      return res.status(404).json({ success: false, message: "please prove title and description of the post " })
    }

    var obj = { title, description }
    if (req.body.categories) {
      obj.categories = req.body.categories
    }
    const post = new Post(obj);
    const newPostData = await post.save();
    const postData = await Post.findOne({ _id: newPostData._id }).populate('categories')


    return res.status(200).json({ success: true, message: "Post created successfully ", data: postData })

  } catch (error) {
    return res.status(500).json({ success: false, message: "something went wrong while creating post ", error: error })
  }
}



const getPost = async (req, res) => {
  try {
    const posts = await Post.find({}).populate('categories')
    return res.status(200).json({ success: true, message: "Post fetched  successfully ", data: posts })
  } catch (error) {
    return res.status(500).json({ success: false, message: "something went wrong while getting  post ", error: error })
  }
}



const deletePost = async (req, res) => {
  try {
    const { id } = req.body
    const isExist = await Post.findOne({ _id: id })
    if (!isExist) {
      return res.status(400).json({ success: false, message: " Post not exist " })
    }
    await Post.findByIdAndDelete({ _id: id })
    return res.status(200).json({ success: true, message: "Post deleted  successfully " })
  } catch (error) {
    return res.status(500).json({ success: false, message: "something went wrong while deleting post ", error: error })
  }
}

const updatePost = async (req, res) => {
  try {
    const { id, title, description, categories } = req.body;

    // Check if the post exists
    const isExist = await Post.findOne({ _id: id });
    if (!isExist) {
      return res.status(400).json({ success: false, message: "Post does not exist" });
    }

    // Build the update object
    const updateObj = { title, description };
    if (categories) {
      updateObj.categories = categories;
    }

    // Update the post
    const updatedData = await Post.findByIdAndUpdate(id, updateObj, { new: true });

    // Check if the update was successful
    if (!updatedData) {
      return res.status(404).json({ success: false, message: "Failed to update the post" });
    }

    // Return success response
    return res.status(200).json({ success: true, message: "Post updated successfully", data: updatedData });
  } catch (error) {
    // Handle errors
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating the post",
      error: error.message,
    });
  }
};

module.exports = { createPost, getPost, deletePost, updatePost }