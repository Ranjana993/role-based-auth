const express = require('express');
const commonRoute = express.Router();
const verifyToken = require('../middleware/authmiddleware');
const { addCategory, getCategory, deleteCategory, updateCategory } = require('../controller/categoryController');
const { createPost, getPost, deletePost, updatePost } = require('../controller/postController');
const { createUser, getUser, updateUser, deleteUser } = require('../controller/userController');
const { postLike, postunLike, postLikeCounters } = require('../controller/likeController');

//  add category 
commonRoute.post("/add-category", verifyToken, addCategory)
commonRoute.get("/get-category", verifyToken, getCategory)
commonRoute.post("/delete-category", verifyToken, deleteCategory)
commonRoute.post("/update-category", verifyToken, updateCategory)


// POST ROUTING .....
commonRoute.post("/create-post", verifyToken, createPost)
commonRoute.get("/get-post", verifyToken, getPost)

commonRoute.post("/delete-post", verifyToken, deletePost)

commonRoute.post("/update-post", verifyToken, updatePost)

// for users
commonRoute.post("/create-user", verifyToken, createUser)
commonRoute.get("/get-user", verifyToken, getUser)
commonRoute.post("/update-user", verifyToken, updateUser)

commonRoute.post("/delete-user", verifyToken, deleteUser)



//  like & unlike routes
commonRoute.post("/post-like", verifyToken, postLike)
commonRoute.post("/post-unlike", verifyToken, postunLike)
commonRoute.post("/like-counters", verifyToken, postLikeCounters)

module.exports = commonRoute

