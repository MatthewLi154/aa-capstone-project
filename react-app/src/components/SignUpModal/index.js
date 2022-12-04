import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignUpModal.css";

const SignUpModal = ({ open, onClose, props }) => {
  if (!open) return null;

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const validate = () => {
    let errors = [];

    if (password.length === 0) {
      errors.push("Please enter a password");
    } else if (password.length > 20 || password.length < 6) {
      errors.push("Password must be between 6 and 20 characters");
    }

    if (password !== repeatPassword) {
      errors.push("Passwords don't match");
    }

    if (repeatPassword.length === 0) {
      errors.push("Please confirm your password");
    }

    if (username.length === 0) {
      errors.push("Please enter a username");
    } else if (username.length < 4 || username.length > 30) {
      errors.push("Username must be between 4 and 30 characters");
    }

    let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.[a-z]{2,3}$/;

    if (email.length === 0) {
      errors.push("Please enter an email address");
    } else if (email.length < 3 || email.length > 256) {
      errors.push("Email must be between 3 and 255 characters");
    } else if (!emailReg.test(email)) {
      errors.push("Please enter a valid email");
    }

    if (firstName.length === 0) {
      errors.push("Please enter your first name");
    } else if (firstName.length > 50) {
      errors.push("Please use less than 50 characters for your first name");
    }

    if (lastName.length === 0) {
      errors.push("Please enter your last name");
    } else if (lastName.length > 50) {
      errors.push("Please use less than 50 characters for your last name");
    }

    if (errors.length > 0) setErrors(errors);
    setErrors(errors);
    return errors;
  };

  const onSignUp = async (e) => {
    e.preventDefault();

    const errors = validate();

    if (errors.length > 0) {
      return setErrors(errors);
    }

    if (password === repeatPassword) {
      const data = await dispatch(
        signUp(username, email, password, firstName, lastName)
      );
      if (data) {
        setErrors(data);
      }
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div onClick={onClose} className="overlay">
      <div
        className="signup-main-modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="login-form-logo">
          <img src="https://i.postimg.cc/7ZXVLnRs/Pinature-1-2.png"></img>
        </div>
        <div className="welcome-header">Welcome to Pinature</div>
        <div className="find-new-ideas">Find new ideas to try</div>
        {errors &&
          errors.map((error) => (
            <div style={{ color: "red", fontWeight: "600" }}>{error}</div>
          ))}
        <form onSubmit={onSignUp}>
          <div className="email-input-container">
            <label>Email</label>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="email-input-container">
            <label>Username</label>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className="email-input-container">
            <label>Password</label>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="email-input-container">
            <label>Confirm password</label>
            <input
              placeholder="Confirm password"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            ></input>
          </div>
          <div className="email-input-container">
            <label>First name</label>
            <input
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </div>
          <div className="email-input-container">
            <label>Last name</label>
            <input
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </div>
          <div className="login-button-container">
            <button type="submit">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
