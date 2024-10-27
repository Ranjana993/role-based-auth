const mongoose = require("mongoose")

const CommentSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Type.ObjectId,
    required: true,
    ref: 'User'
  },
  post_id: {
    type: mongoose.Schema.Type.ObjectId,
    required: true,
    ref: 'Post'
  },
  comments: { type: String, required: true }
})

const Comment = mongoose.model.model('User', CommentSchema)

module.exports = Comment