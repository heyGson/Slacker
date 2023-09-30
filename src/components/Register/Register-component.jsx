import "../Register/Register-component.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// slack API URL: http://206.189.91.54/api/v1/

// login details:
// Email: heygson@gmail.com
//Password: mypassword

const apiUrl = "http://206.189.91.54/api/v1/auth";

function Register() {
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setConfirmRegPassword] = useState("");
  const [regEmailError, setRegEmailError] = useState("");
  const [regPasswordError, setRegPasswordError] = useState("");
  const [regConfirmPasswordError, setRegConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    setRegEmailError("");
    setRegPasswordError("");
    setRegConfirmPasswordError("");

    if (
      regEmail.length === 0 &&
      regPassword.length === 0 &&
      regConfirmPassword.length === 0
    ) {
      setRegEmailError("This field cannot be empty");
      setRegPasswordError("This field cannot be empty");
      setRegConfirmPasswordError("This field cannot be empty");
    } else if (regEmail.length === 0) {
      setRegEmailError("This field cannot be empty");
    } else if (regPassword.length === 0) {
      setRegPasswordError("This field cannot be empty");
    } else if (regConfirmPassword.length === 0) {
      setRegConfirmPasswordError("This field cannot be empty");
    } else if (regEmail.indexOf("@") === -1) {
      setRegEmailError("Invalid email format");
    } else if (regPassword !== regConfirmPassword) {
      setRegPasswordError("The password didn't match");
      setRegConfirmPasswordError("The password didn't match");
    } else {
      // Successful Registration, redirect to the Workspace page
      // navigate("/Workspace");
      const requestBody = {
        email: regEmail,
        password: regPassword,
        password_confirmation: regConfirmPassword,
      };
      try {
        // Make an API POST request to register the user
        const response = await axios.post(apiUrl, requestBody);
        console.log(response);
        // Check if the registration was successful
        if (response.status === 200) {
          // Successful Registration, clear search results in local storage
          // localStorage.removeItem("searchResults");
          // Successful Registration, redirect to the Workspace page
          navigate("/");
        } else {
          // Handle registration error, if any
        }
      } catch (error) {
        // Handle network error or other errors here
        console.error("Registration failed:", error);
      }
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="register-header">
          <div className="slacker-logo-container">
            <span className="slacker-logo">
              <img src="images/slack-new-logo.svg" alt="" />
            </span>
            <p className="slacker-text">Slacker</p>
          </div>
          <header>Register to Slacker</header>
        </div>
        <form onSubmit={handleRegistration}>
          <div className="input-box">
            <input
              type="text"
              className="input-field"
              placeholder="Email"
              autoComplete="off"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
            />
            <div className="reg-error-message">{regEmailError}</div>
          </div>
          <div className="input-box">
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              autoComplete="off"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
            />
            <div className="reg-error-message">{regPasswordError}</div>
          </div>
          <div className="input-box">
            <input
              type="password"
              className="input-field"
              placeholder="Confirm password"
              autoComplete="off"
              value={regConfirmPassword}
              onChange={(e) => setConfirmRegPassword(e.target.value)}
            />
            <div className="reg-error-message">{regConfirmPasswordError}</div>
          </div>

          <div className="input-submit">
            <button className="submit-btn" id="submit"></button>
            <label htmlFor="submit">Register</label>
          </div>
        </form>
        <div className="sign-up-link">
          <p>
            Already using Slacker?
            <Link className="sign-in-link" to="/">
              Sign in to an existing workspace
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Register;
