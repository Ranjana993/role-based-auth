const express = require('express');
const categoryRouter = express.Router();
const verifyToken = require('../middleware/authmiddleware');
const { addCategory, getCategory, deleteCategory, updateCategory } = require('../controller/categoryController');
const { createPost, getPost, deletePost, updatePost } = require('../controller/postController');

//  add category 
categoryRouter.post("/add-category" , verifyToken , addCategory)
categoryRouter.get("/get-category", verifyToken, getCategory)
categoryRouter.post("/delete-category", verifyToken, deleteCategory)
categoryRouter.post("/update-category", verifyToken, updateCategory)


// POST ROUTING .....
categoryRouter.post("/create-post", verifyToken, createPost)
categoryRouter.get("/get-post" , verifyToken, getPost)

categoryRouter.post("/delete-post", verifyToken, deletePost)

categoryRouter.post("/update-post", verifyToken, updatePost)


module.exports = categoryRouter

