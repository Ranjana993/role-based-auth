const express = require('express');
const categoryRouter = express.Router();
const verifyToken = require('../middleware/authmiddleware');
const { addCategory, getCategory, deleteCategory, updateCategory } = require('../controller/categoryController');
const { createPost, getPost } = require('../controller/postController');

//  add category 
categoryRouter.post("/add-category" , verifyToken , addCategory)
categoryRouter.get("/get-category", verifyToken, getCategory)
categoryRouter.post("/delete-category", verifyToken, deleteCategory)
categoryRouter.post("/update-category", verifyToken, updateCategory)


// POST ROUTING .....
categoryRouter.post("/create-post", verifyToken, createPost)
categoryRouter.get("/get-post" , verifyToken, getPost)

module.exports = categoryRouter

