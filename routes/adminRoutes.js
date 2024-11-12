const express = require('express');
const { addPermission, getPermission, deletePermission, updatePermission } = require('../controller/adminController/permissionController');
const verifyToken = require('../middleware/authmiddleware');
const { onlyAdminAccess } = require('../middleware/adminMiddleware');

const adminRoute = express.Router();

adminRoute.post("/add-permision", verifyToken, onlyAdminAccess,  addPermission)
adminRoute.get("/get-permision", verifyToken, onlyAdminAccess, getPermission)
adminRoute.post("/delete-permision", verifyToken, onlyAdminAccess, deletePermission)
adminRoute.post("/update-permision", verifyToken, onlyAdminAccess, updatePermission)

module.exports = adminRoute 