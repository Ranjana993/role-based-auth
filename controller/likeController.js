const Like = require("../models/like_model")

const postLike = async (req, res) => {
  try {
    const { user_id, post_id } = req.body
    const isExist = await Like.findOne({ user_id, post_id })

    if (isExist) {
      return res.status(400).json({ success: false, message: "Already liked!" })
    }

    const like = new Like({ user_id, post_id })
    const newLike = await like.save()

    return res.status(200).json({ success: true, message: "Successfully liked ", data: newLike });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Error in postLike", error: error.message });
  }
}

const postunLike = async (req, res) => {
  try {
    const { user_id, post_id } = req.body
    const isExist = await Like.findOne({ user_id, post_id })

    if (!isExist) {
      return res.status(400).json({ success: false, message: " You have not liked " })
    }

    await Like.deleteOne({ user_id, post_id })
    return res.status(200).json({ success: true, message: "Successfully unliked" });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Error in post unliking", error: error.message });
  }
}

const postLikeCounters = async (req, res) => {
  try {
    const { post_id } = req.body
    const counter = await Like.find({ post_id }).countDocuments();
    return res.status(200).json({ success: true, message: "Successfully get counter ", data: counter });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error in post  like counter", error: error.message });
  }
}


module.exports = { postLike, postunLike, postLikeCounters }