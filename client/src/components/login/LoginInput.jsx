import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { SignupContext } from "../../context/SignUp";
import axios from "axios";
import Cookie from "js-cookie";

const LoginInput = () => {
  let navigate = useNavigate();
  let { setValue, loginErrMsg, setLoginErrMsg, setUserData } = useContext(SignupContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (currValues) => {
      try {
        let send = await axios.post("http://localhost:8000/user/login", {
          email: currValues.email,
          password: currValues.password,
        });
        setLoginErrMsg(() => "");
        let { message, ...rest } = send.data;
        setUserData(() => rest);
        Cookie.set("user", JSON.stringify(rest));
        navigate("/");
      } catch (error) {
        console.log(error.response.data.message);
        setLoginErrMsg(() => error.response.data.message);
      }
    },
    validate: (currValues) => {
      let errors = {};
      if (!currValues.email) errors.email = "Email is required*";
      if (!currValues.password) errors.password = "Password is required*";
      return errors;
    },
  });
  return (
    <div>
      <form action="" onSubmit={formik.handleSubmit}>
        <span>{formik.errors.email && formik.touched.email ? formik.errors.email : null}</span>
        <input
          className={formik.errors.email && formik.touched.email ? "error" : ""}
          type="email"
          placeholder="Email address "
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <span>{formik.errors.password && formik.touched.password ? formik.errors.password : null}</span>
        <input
          className={formik.errors.password && formik.touched.password ? "error" : ""}
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="on"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {loginErrMsg ? <p className="loginErr">{loginErrMsg}</p> : ""}
        <button type="submit">Log In</button>
        <div className="forget">
          <Link className="forget" to="#">
            Forgotten password?
          </Link>
        </div>
        <hr />
        <div className="createNew">
          <Link to="#" onClick={() => setValue(true)}>
            Create New Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginInput;
