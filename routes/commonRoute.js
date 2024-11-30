const express = require('express');
const commonRoute = express.Router();
const verifyToken = require('../middleware/authmiddleware');
const { addCategory, getCategory, deleteCategory, updateCategory } = require('../controller/categoryController');
const { createPost, getPost, deletePost, updatePost } = require('../controller/postController');
const { createUser, getUser, updateUser, deleteUser } = require('../controller/userController');
const { postLike, postunLike, postLikeCounters } = require('../controller/likeController');
const checkPermission = require('../middleware/checkPermission');

//  add category 
commonRoute.post("/add-category", verifyToken, addCategory)
commonRoute.get("/get-category", verifyToken, checkPermission, getCategory)
commonRoute.post("/delete-category", verifyToken, checkPermission, deleteCategory)
commonRoute.post("/update-category", verifyToken, checkPermission, updateCategory)


// POST ROUTING .....
commonRoute.post("/create-post", verifyToken, checkPermission, createPost)
commonRoute.get("/get-post", verifyToken, checkPermission, getPost)

commonRoute.post("/delete-post", verifyToken, checkPermission, deletePost)

commonRoute.post("/update-post", verifyToken, checkPermission, updatePost)

// for users
commonRoute.post("/create-user", verifyToken, checkPermission, createUser)
commonRoute.get("/get-user", verifyToken, checkPermission, getUser)
commonRoute.post("/update-user", verifyToken, checkPermission, updateUser)

commonRoute.post("/delete-user", verifyToken, checkPermission, deleteUser)



//  like & unlike routes
commonRoute.post("/post-like", verifyToken, checkPermission, postLike)
commonRoute.post("/post-unlike", verifyToken, checkPermission, postunLike)
commonRoute.post("/like-counters", verifyToken, checkPermission, postLikeCounters)

module.exports = commonRoute

