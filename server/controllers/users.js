const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/jwtAuth");
const { sendVerificationMail } = require("../helpers/mailer");
require("dotenv").config();
const { validateEmail } = require("../helpers/validation");
let User = require("../models/users");

let register = async (req, res) => {
  let { firstName, lastName, userName, email, password, gender, bYear, bMonth, bDay, picture, cover } = req.body;

  // email cheker
  if (!validateEmail(email)) {
    res.status(400).send("please enter a valid email");
    return;
  }

  // username existense check
  let getUsername = await User.findOne({ userName: userName });
  if (getUsername) {
    res.status(400).send("username already exists, please pick another name");
    return;
  }

  // email existense check
  let getEmail = await User.findOne({ email: email });
  if (getEmail) {
    res.status(400).send("email already exists, please register with another email");
    return;
  }

  // check password length
  if (password.length < 6 || password.length > 50) {
    res.status(400).send("password must be greater than 5 characters");
    return;
  }

  // generating a incrypted password.
  const cryptedPass = await bcrypt.hash(password, 12);

  // creating new user if all the above checks are passed
  let user = new User({
    firstName,
    lastName,
    userName,
    email,
    password: cryptedPass,
    gender,
    bYear,
    bMonth,
    bDay,
    picture,
    cover,
  });

  // saving user to the database
  await user.save();

  // email verification
  let EmailVerificationToken = generateToken({ id: user.id.toString() }, process.env.SECRET_KEY, "30m");

  const url = `${process.env.baseUrl}/activate/${EmailVerificationToken}`;

  sendVerificationMail(user.email, user.firstName, url);

  //generating a new token to send to the front user so that he can use it to authenticate.
  const token = generateToken({ id: user.id.toString() }, process.env.SECRET_KEY, "7d");

  // sending the response.
  res.send({
    id: user._id,
    userName: user.userName,
    picture: user.picture,
    firstName: user.firstName,
    lastName: user.lastName,
    token: token,
    verified: user.verified,
    message: "Registration successful. Please activate your account.",
  });
};

let activateAccount = async (req, res) => {
  const { token } = req.body;
  const user = jwt.verify(token, process.env.SECRET_KEY);
  console.log(user);
  // check if the user account is already verified
  let getUser = await User.findById(user.id);
  if (getUser.verified === true) {
    return res.status(400).json({ message: "this account is already activated" });
  } else {
    await User.findByIdAndUpdate(user.id, { verified: true });
    return res.status(200).json({ message: "account has been successfully activated. ENJOY!!! " });
  }
};

let login = async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email: email });
  if (!user) return res.status(400).json({ message: "this account does not exist" });
  else {
    let checkIfPassIsCorrect = await bcrypt.compare(password, user.password);
    if (!checkIfPassIsCorrect) return res.status(400).json({ message: "Invalid Credentials" });
    else {
      //generating a new token to send to the front user so that he can use it to authenticate.
      const token = generateToken({ id: user.id.toString() }, process.env.SECRET_KEY, "7d");

      // sending the response.
      res.send({
        id: user._id,
        userName: user.userName,
        picture: user.picture,
        firstName: user.firstName,
        lastName: user.lastName,
        token: token,
        verified: user.verified,
        message: "Login Successful",
      });
    }
  }
};

module.exports = { register, activateAccount, login };
