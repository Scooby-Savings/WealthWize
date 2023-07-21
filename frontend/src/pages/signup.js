import React, { useState, useContext } from "react";
import landingImage from "./../images/DALL·E 2023-07-07 10.27 1.png";
import "./LoginSignupPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import { GoogleLogin } from 'react-google-login';

const Signup = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/api/users/signup",
      {
        name: `${event.target.firstName.value} ${event.target.lastName.value}`,
        username: event.target.username.value,
        password: event.target.password.value,
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
  };

  const onSuccess = async (res) => {
    console.log("login successful. current user: ", res.profileObj)

    const response = await axios.post(
      "http://localhost:3000/api/users/googleSignup",
      {
        name: res.profileObj.givenName,
        username: res.profileObj.name
      }
    );
    if (response.data.username){
      auth.login(
        res.profileObj.givenName,
        res.profileObj.name
      );
      navigate("/dashboard");
    }
  }

  const onFailure = (res) => {
    console.log("login failed" , res)
  }

  const clientId = "1084433748458-f117f0kvq4u7ve0vftgkaa97se04q7h3.apps.googleusercontent.com"

  return (
    <div className="login-signup-page-container">
      <div
        className="image-box"
        style={{
          backgroundImage: `url(${landingImage})`,
        }}
      >
        <div className="website-title">WealthWize</div>
      </div>
      <div className="form-box">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-title">Join Us</div>
          <div className="login-inputs">
            <div className="first-last">
              <input placeholder="First Name" name="firstName" />
              <input placeholder="Last Name" name="lastName" />
            </div>

            <input placeholder="Username" name="username" />
            <input type="password" placeholder="Password" name="password" />
          </div>
          <div id='signInButton'>
            <GoogleLogin
              clientId={clientId}
              buttonText="Sign Up with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignIn={true}
            />
          </div>
          <div>
            Already saving?{" "}
            <span
              className="bold"
              onClick={() => {
                navigate("/");
              }}
            >
              Log in here
            </span>
          </div>
          <button className="login-signup-btn">Sign up</button>
        </form>
      </div>
    </div>
  );
};
export default Signup;
