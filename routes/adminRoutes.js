const express = require('express');
const { addPermission, getPermission, deletePermission, updatePermission } = require('../controller/adminController/permissionController');
const verifyToken = require('../middleware/authmiddleware');

const adminRoute = express.Router();

adminRoute.post("/add-permision", verifyToken, addPermission)
adminRoute.get("/get-permision", verifyToken, getPermission)
adminRoute.post("/delete-permision", verifyToken, deletePermission)
adminRoute.post("/update-permision", verifyToken, updatePermission)

module.exports = adminRoute 