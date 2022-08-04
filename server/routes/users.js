const express = require("express");
const { register, activateAccount, login } = require("../controllers/users");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/activate", activateAccount);
userRouter.post("/login", login);

module.exports = userRouter;
