const express = require("express");
const { registerUser } = require("../controller/authControlller");
const route = express.Router();

route.post("/register", registerUser)

module.exports = route

