const express = require('express');
const categoryRouter = express.Router();
const verifyToken = require('../middleware/authmiddleware');
const { addCategory, getCategory, deleteCategory, updateCategory } = require('../controller/categoryController');

//  add category 
categoryRouter.post("/add-category" , verifyToken , addCategory)
categoryRouter.get("/get-category", verifyToken, getCategory)
categoryRouter.post("/delete-category", verifyToken, deleteCategory)
categoryRouter.post("/update-category", verifyToken, updateCategory)


module.exports = categoryRouter

