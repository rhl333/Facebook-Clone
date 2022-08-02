const express = require("express");
const mongoose = require("mongoose");
let userRouter = require("./routes/users");

// initlizing the server
const server = express();

// setting up some default middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

const start = async () => {
  await mongoose.connect("mongodb://127.0.0.1/facebook");

  server.use("/user", userRouter);

  server.listen(8000, () => console.log("listening on port 8000"));
};

start();

mongoose.connection.once("open", () => console.log("connected to database"));
mongoose.connection.on("error", (err) => console.log("some error occured \n", err));
