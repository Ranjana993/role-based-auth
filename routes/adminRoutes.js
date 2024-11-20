const express = require('express');
const { addPermission, getPermission, deletePermission, updatePermission } = require('../controller/adminController/permissionController');
const verifyToken = require('../middleware/authmiddleware');
const { onlyAdminAccess } = require('../middleware/adminMiddleware');
const { storeRole, getRole } = require('../controller/roleController');

const adminRoute = express.Router();

adminRoute.post("/add-permision", verifyToken, onlyAdminAccess,  addPermission)
adminRoute.get("/get-permision", verifyToken, onlyAdminAccess, getPermission)
adminRoute.post("/delete-permision", verifyToken, onlyAdminAccess, deletePermission)
adminRoute.post("/update-permision", verifyToken, onlyAdminAccess, updatePermission)


// roles route
adminRoute.post("/store-role" , verifyToken , storeRole )
adminRoute.get("/get-roles", verifyToken , getRole)



module.exports = adminRoute 