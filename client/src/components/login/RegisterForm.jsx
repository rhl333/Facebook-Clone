import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import cookie from "js-cookie";
import SelectDate from "./SelectDate";
import SelectMonth from "./SelectMonth";
import SelectYear from "./SelectYear";
import { SignupContext } from "../../context/SignUp";
import "./register.css";

const RegisterForm = () => {
  let navigate = useNavigate();
  let { setValue, setUserData, msg, setMsg, color, setColor } = useContext(SignupContext);
  let [date, setDate] = useState("1");
  function handleDate(e) {
    setDate(e.target.value);
  }
  let [month, setMonth] = useState("Jan");
  function handleMonth(e) {
    setMonth(e.target.value);
  }
  let [year, setYear] = useState("1990");
  function handleYear(e) {
    setYear(e.target.value);
  }
  let [gender, setGender] = useState("Male");

  const formik = useFormik({
    initialValues: {
      fName: "",
      lName: "",
      email: "",
      password: "",
    },
    onSubmit: async (currState) => {
      try {
        // generating uqique numbers for username
        let firstNum = Math.floor(Math.random() * 600 + 1);
        let secondNum = Math.floor(Math.random() * 300 + 1);
        let thirdNum = Math.floor(Math.random() * 800 + 1);
        let fourthNum = Math.floor(Math.random() * 10 + 1);

        let send = await axios.post("http://localhost:8000/user/register", {
          firstName: currState.fName,
          lastName: currState.lName,
          email: currState.email,
          password: currState.password,
          bYear: year,
          bMonth: month,
          bDay: date,
          gender: gender,
          userName: (currState.fName + currState.lName + firstNum + secondNum + thirdNum + fourthNum).toLowerCase(),
        });
        let { message, ...rest } = send.data;
        setUserData(() => rest);
        setColor(() => true);
        setMsg(message);
        cookie.set("user", JSON.stringify(rest));
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } catch (error) {
        console.log(error.response.data);
        setColor(() => false);
        setMsg(error.response.data);
      }
    },
    validate: (currState) => {
      let errors = {};
      if (!currState.fName) errors.fName = "First Name is required*";
      if (!currState.lName) errors.lName = "Last Name is required*";
      if (!currState.email) errors.email = "Email is required*";
      else if (
        !String(currState.email)
          .toLowerCase()
          .match(/^([a-z\d\.~]+)@([a-z\d~]+)\.([a-z]{2,15})(\.[a-z]{2,12})?$/)
      ) {
        errors.email = "Email is not valid";
      }
      if (!currState.password) errors.password = "Please Enter a Password*";
      else if (currState.password.length < 8) errors.password = "Password length must be greater than 8 characters*";
      return errors;
    },
  });
  return (
    <div className="blur">
      <div className="main">
        <div className="topHead">
          <div className="left">
            <h2>Sign Up</h2>
            <p>It's quick and easy.</p>
          </div>
          <div className="right" id="cut" onClick={() => setValue(false)}>
            <div>
              <hr />
              <hr />
            </div>
          </div>
        </div>

        <hr className="line" />

        <form action="" onSubmit={formik.handleSubmit}>
          <div className="name">
            <div>
              <span className="error">{formik.errors.fName && formik.touched.fName ? formik.errors.fName : ""}</span>
              <input
                type="text"
                name="fName"
                placeholder="First Name"
                value={formik.values.fName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div>
              <span className="error">{formik.errors.lName && formik.touched.lName ? formik.errors.lName : ""}</span>
              <input
                type="text"
                name="lName"
                placeholder="Last Name"
                value={formik.values.lName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <span className="error">{formik.errors.email && formik.touched.email ? formik.errors.email : ""}</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span className="error">{formik.errors.password && formik.touched.password ? formik.errors.password : ""}</span>
          <input
            type="password"
            name="password"
            autoComplete="on"
            placeholder="New Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <p>Date of birth</p>
          <div className="dob">
            <SelectDate handleDate={handleDate} />
            <SelectMonth handleMonth={handleMonth} />
            <SelectYear handleYear={handleYear} />
          </div>
          <p className="gender">Gender</p>
          <div className="gender">
            <select name="gender" id="gender" onChange={(e) => setGender(e.target.value)}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <p className="terms">People who use our service may have uploaded your contact information to Facebook. Learn more.</p>
          <p className="terms ">
            By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out
            at any time.
          </p>
          <div className="btn">
            <button type="submit">Sign Up</button>
          </div>
          <p className="msg" style={{ color: color ? "green" : "red" }}>
            {msg}
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
