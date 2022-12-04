import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import "./LoginModal.css";

const LoginModal = ({ open, onClose, props }) => {
  if (!open) return null;

  const [errors, setErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState("");
  const [emailErrors, setEmailErrors] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    console.log(errors);

    let emailErrors = [];
    let passwordErrors = [];
    for (const error of errors) {
      if (error === "email : This field is required.") {
        emailErrors.push("Please input your email");
      } else if (error === "email : Email provided not found.") {
        emailErrors.push("Please use an email that is signed up with Pinature");
      }
      setEmailErrors(emailErrors);

      if (error === "password : This field is required.") {
        passwordErrors.push("Please input your password");
      } else if (error === "password : No such user exists.") {
        passwordErrors.push("Password is incorrect");
      } else if (error === "password : Password was incorrect.") {
        passwordErrors.push("Password is incorrect");
      }
      setPasswordErrors(passwordErrors);
    }
  }, [errors]);

  const onDemoLogin = async (e) => {
    e.preventDefault();

    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    }

    if (!data) {
      onClose();
    }

    history.push("/");
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setEmailErrors([]);
    setPasswordErrors([]);
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }

    if (!data) {
      onClose();
    }

    history.push("/");
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div onClick={onClose} className="overlay">
      <div
        className="main-login-form-container-modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="login-form-logo">
          <img src="https://i.postimg.cc/7ZXVLnRs/Pinature-1-2.png"></img>
        </div>
        <div className="welcome-header">Welcome to Pinature</div>
        <div>
          <div className="email-input-container">
            <label>Email</label>
            <input
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            ></input>
            {emailErrors &&
              emailErrors.map((error) => (
                <div style={{ color: "red" }}>{error}</div>
              ))}
          </div>
          <div className="email-input-container">
            <label>Password</label>
            <input
              placeholder="Password"
              value={password}
              onChange={updatePassword}
              type="password"
            ></input>
            {passwordErrors &&
              passwordErrors.map((error) => (
                <div style={{ color: "red" }}>{error}</div>
              ))}
          </div>
          <div className="login-button-container">
            <button onClick={onLogin}>Log in</button>
          </div>
          <div className="login-button-container">
            <button onClick={onDemoLogin}>Demo User</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
