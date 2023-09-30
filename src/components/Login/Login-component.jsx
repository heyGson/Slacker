import "../Login/Login-component.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// email = "heygson@gmail.com";
// Password = "mypassword";
// ownerid = 3771

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    if (email.length === 0 || password.length === 0) {
      setEmailError("This field cannot be empty");
      setPasswordError("This field cannot be empty");
    } else {
      try {
        const response = await fetch(
          "http://206.189.91.54/api/v1/auth/sign_in",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          }
        );

        if (response.status === 200) {
          onLogin(email); // Call the function to set the user's email
          localStorage.setItem("userEmail", email); // Store the email in localStorage
          // Successful login, redirect to the Workspace page
          navigate("/Workspace");
          console.log("successfull login");
        } else if (response.status === 401) {
          // Unauthorized - incorrect email or password
          setEmailError("Incorrect email or password, please try again");
        } else {
          // Handle other error cases here
          console.error("Login failed with status: ", response.status);
        }
      } catch (error) {
        // Handle network or other errors here
        console.error("Login failed with error: ", error);
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <div className="slacker-logo-container">
            <span className="slacker-logo">
              <img src="images/slack-new-logo.svg" alt="" />
            </span>
            <p className="slacker-text">Slacker</p>
          </div>
          <header>Sign in to Slacker</header>
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-box">
            <input
              type="text"
              className="input-field"
              placeholder="Email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="error-message">{emailError}</div>
          </div>
          <div className="input-box">
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="error-message">{passwordError}</div>
          </div>
          <div className="forgot">
            <section>
              <input type="checkbox" id="check" />
              <label htmlFor="check"> Remember me</label>
            </section>
            <section>
              <a href="#">Forgot password</a>
            </section>
          </div>
          <div className="input-submit">
            <button className="submit-btn" id="submit"></button>
            <label htmlFor="submit">Sign In</label>
          </div>
        </form>
        <div className="sign-up-link">
          <p>
            New to Slacker? <Link to="/Register">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
