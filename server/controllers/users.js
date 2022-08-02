const { LengthChecker } = require("../helpers/validation");
let User = require("../models/users");

let register = async (req, res) => {
  let { firstName, lastName, userName, email, password, gender, bYear, bMonth, bDay, picture, cover } = req.body;
  let user = new User({
    firstName,
    lastName,
    userName,
    email,
    password,
    gender,
    bYear,
    bMonth,
    bDay,
    picture,
    cover,
  });

  // if ((await User.find({ userName: userName }).length) === 0) {
  //   res.send("username already exists");
  //   return { msg: "username already exists" };
  // }

  // username existense check
  let getUsername = await User.find({ userName: userName });
  if (getUsername.length > 0) {
    res.send("username already exists, please pick another name");
    return;
  }

  // email existense check
  let getEmail = await User.find({ email: email });
  if (getEmail.length > 0) {
    res.send("email already exists, please register with another email");
    return;
  }

  // check userName length
  if (userName.length < 4 || userName.length > 10) {
    res.send("username must be in between 3 and 10 characters");
    return;
  }

  // check password length
  if (password.length < 6 || password.length > 50) {
    res.send("password must be greater than 5 characters");
    return;
  }

  await user.save();
  res.json(user);
};

module.exports = { register };
