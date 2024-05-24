const express = require("express");
const router = express.Router();
const UserController = require("../controller/user.controller");
const { verifyJwtToken } = require("../utils/jwtUtlis");

// API => GET
router.get("/balance",verifyJwtToken,UserController.getBalance);

// API => POST
router.get("/login",verifyJwtToken,UserController.Login);

module.exports = router;
