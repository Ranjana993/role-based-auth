const express = require("express");
const { registerUser, loginUser, getProfile } = require("../controller/authControlller");
const verifyToken = require("../middleware/authmiddleware");
const route = express.Router();

route.post("/register", registerUser)
route.post("/login", loginUser)
route.get("/profile",  verifyToken, getProfile)

module.exports = route

