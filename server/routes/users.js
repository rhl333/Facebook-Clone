const express = require("express");
const { register, showData } = require("../controllers/users");

const userRouter = express.Router();

userRouter.post("/register", register);

module.exports = userRouter;
