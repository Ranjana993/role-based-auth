
const Category = require("../models/category_model")
const addCategory = async (req, res) => {
  try {
    // console.log(req.body);

    const { category_name } = req.body
    if (!category_name) {
      return res.status(400).json({ success: false, message: "Category name is requried " });
    }

    const existingCategory = await Category.findOne({
      name: {
        $regex: category_name,
        $options: 'i'
      }
    })
    if (existingCategory) {
      return res.status(401).json({ success: false, message: "cat egory name already exists " })
    }
    const newCategory = new Category({
      name: category_name
    })
    // console.log("newCategory", newCategory);

    const newCategoryData = await newCategory.save();
    return res.status(200).json({ success: true, message: "Category created successfully ", data: newCategoryData })
  } catch (error) {
    return res.status(500).json({ error: error, message: "Error saving category" })
  }
}


const getCategory = async (req, res) => {
  try {
    const categories = await Category.find({})
    return res.status(200).json({ success: true, message: "category fetched successfully", data: categories })
  } catch (error) {
    return res.status(500).json({ error: error, message: "Error getting  category" })
  }
}


const updateCategory = async (req, res) => {
  try {
    const { id, category_name } = req.body;
    const isExist = await Category.findOne({ _id: id })
    if (!isExist) {
      return res.status(201).json({ success: false, message: "category id does not found " })
    }

    const existingCategory = await Category.findOne({
      _id: { $ne: id },
      name: {
        $regex: category_name,
        $options: 'i'
      }
    })
    if (existingCategory) {
      return res.status(401).json({ success: false, message: "category name already assigned to another category " })
    }

    const updatedData = await Category.findByIdAndUpdate({ _id: id }, { $set: { name: category_name } }, { new: true })
    return res.status(200).json({ success: true, message: "category updated successfully", data: updatedData })
  } catch (error) {
    return res.status(500).json({ error: error, message: "Error while updating category" })
  }
}

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;
    const isExist = await Category.findOne({ _id: id })
    if (!isExist) {
      return res.status(201).json({ success: false, message: "category id does not found " })
    }
    await Category.findByIdAndDelete({ _id: id })
    return res.status(200).json({ success: true, message: "category deleted successfully" })

  } catch (error) {
    return res.status(500).json({ error: error, message: "Error while deleting  category" })
  }
}






module.exports = { addCategory, getCategory, deleteCategory, updateCategory }