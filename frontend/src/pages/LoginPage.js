import React, { useState, useContext } from "react";
import landingImage from "./../images/DALL·E 2023-07-07 10.27 1.png";
import "./LoginSignupPage.css";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from 'react-google-login';

function LoginPage() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const clientId = "1084433748458-f117f0kvq4u7ve0vftgkaa97se04q7h3.apps.googleusercontent.com"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const onSuccess = async (res) => {
      try {
        const name = res.profileObj.givenName;
        const username = res.profileObj.name;
        const response = await axios.post(
          "http://localhost:3000/api/users/googleLogin",
          {
            name,
            username,
          }
        );
        if (response.data.token) {
          auth.login(
            name,
            username,
          );
          navigate("/dashboard");
        }
    } catch (err) {
      console.log(err)
    }
  };

  const onFailure = (res) => {
    console.log("login failed" , res)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          username,
          password,
        }
      );
      if (response.data.token) {
        auth.login(
          response.data.token,
          response.data.username,
          response.data.userID
        );
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-signup-page-container">
      <div
        className="image-box"
        style={{
          backgroundImage: `url(${landingImage})`,
        }}
      >
        <div className="website-title">Scooby Savings</div>
      </div>
      <div className="form-box">
        <div className="form">
          <div className="form-title">Start Saving</div>
          <div className="login-inputs">
            <input placeholder="Username" onChange={handleUsernameChange} />
            <input
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </div>
          <div id='signInButton'>
            <GoogleLogin
              clientId={clientId}
              buttonText="Login"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignIn={true}
            />
          </div>

          <div>
            Not saving yet?{" "}
            <span
              className="bold"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up here
            </span>
          </div>
          <button className="login-signup-btn" onClick={handleLoginSubmit}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
