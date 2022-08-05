import React, { useContext } from "react";
import facebookicon from "../../assets/icons/facebook.svg";
import { MainLogin, MainLoginLeft, MainLoginRight } from "./style";
import LoginInput from "./LoginInput";
import RegisterForm from "./RegisterForm";
import { SignupContext } from "../../context/SignUp";

const Login = () => {
  let { value } = useContext(SignupContext);
  return (
    <div>
      <div style={{ backgroundColor: "#F1F2F4" }}>
        <MainLogin>
          <MainLoginLeft>
            <img src={facebookicon} alt="" />
            <p>Facebook helps you connect and share with the people in your life.</p>
          </MainLoginLeft>
          <MainLoginRight>
            <LoginInput />
          </MainLoginRight>
        </MainLogin>
      </div>
      <div style={{ display: value ? "block" : "none" }}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Login;
