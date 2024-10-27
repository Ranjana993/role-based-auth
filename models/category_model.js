const mongoose = require("mongoose")

const CategorySchema = mongoose.Schema({
  name: { type: String, required: true },

})

const Category = mongoose.model.model('User', CategorySchema)

module.exports = Category