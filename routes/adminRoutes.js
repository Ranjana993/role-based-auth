const express = require('express');
const { addPermission } = require('../controller/adminController/permissionController');

const adminRoute = express.Router();

adminRoute.post("/add-permision", addPermission)

module.exports = adminRoute 