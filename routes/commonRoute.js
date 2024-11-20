const express = require('express');
const commonRoute = express.Router();
const verifyToken = require('../middleware/authmiddleware');
const { addCategory, getCategory, deleteCategory, updateCategory } = require('../controller/categoryController');
const { createPost, getPost, deletePost, updatePost } = require('../controller/postController');
const { createUser } = require('../controller/userController');

//  add category 
commonRoute.post("/add-category" , verifyToken , addCategory)
commonRoute.get("/get-category", verifyToken, getCategory)
commonRoute.post("/delete-category", verifyToken, deleteCategory)
commonRoute.post("/update-category", verifyToken, updateCategory)


// POST ROUTING .....
commonRoute.post("/create-post", verifyToken, createPost)
commonRoute.get("/get-post" , verifyToken, getPost)

commonRoute.post("/delete-post", verifyToken, deletePost)

commonRoute.post("/update-post", verifyToken, updatePost)

// for users
commonRoute.post("/create-user" , verifyToken , createUser)


module.exports = commonRoute

