import { createContext, useState } from "react";
import cookie from "js-cookie";

let SignupContext = createContext();

/* +++++++++++++++++++++++++++++++++ for signup ++++++++++++++++++++++++++++ */
function SignupProvider({ children }) {
  // for displaying or hiding the registration popup
  const [value, setValue] = useState(false);

  // for storing the user data after successfull login.
  const [userData, setUserData] = useState(() => (cookie.get("user") ? JSON.parse(cookie.get("user")) : []));

  // for showing succuss or fail message after registration
  const [msg, setMsg] = useState(() => "");

  //for setting success or fail message color after registration
  const [color, setColor] = useState(() => true);

  /* +++++++++++++++++++++++++++++++++ for signup ++++++++++++++++++++++++++++ */

  /* +++++++++++++++++++++++++++++++++ for Login ++++++++++++++++++++++++++++ */
  const [loginErrMsg, setLoginErrMsg] = useState(() => "");
  /* +++++++++++++++++++++++++++++++++ for Login ++++++++++++++++++++++++++++ */

  const data = {
    value: value,
    setValue: setValue,
    userData: userData,
    setUserData: setUserData,
    msg: msg,
    setMsg: setMsg,
    color: color,
    setColor: setColor,
    //
    // for login's
    //
    loginErrMsg: loginErrMsg,
    setLoginErrMsg: setLoginErrMsg,
  };

  return <SignupContext.Provider value={data}>{children}</SignupContext.Provider>;
}

export { SignupContext, SignupProvider };
