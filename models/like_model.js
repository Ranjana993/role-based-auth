const mongoose = require("mongoose")

const LikeSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post'
  },
})

const Like = mongoose.model('Like', LikeSchema)

module.exports = Like