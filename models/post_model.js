const mongoose = require("mongoose")

const PostSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false }],

})

const Post = mongoose.model('PostSchema', PostSchema)

module.exports = Post