const mongoose = require("mongoose")

const PostSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  categories: { type: Array, required: false },

})

const Post = mongoose.model.model('PostSchema', PostSchema)

module.exports = Post