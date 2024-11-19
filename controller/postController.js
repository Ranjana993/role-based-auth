
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


module.exports = { createPost, getPost }