import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Signup from "./pages/Signup";
import LoginPage from "./pages/LoginPage";
import { AuthContext } from "./authContext";
import "./index.css";
import axios from "axios";
import {gapi} from 'gapi-script';
import emailjs, {send} from '@emailjs/browser';
const clientId = "1084433748458-f117f0kvq4u7ve0vftgkaa97se04q7h3.apps.googleusercontent.com";

function App() {
  const [token, setToken] = useState(false);
  const [username, setUsername] = useState("");
  const [userID, setUserID] = useState("");
  const [expTime, setExpTime] = useState();

  const navigate = useNavigate();

  const login = (token, user, userID, exp) => {
    setToken(token);
    setUsername(user);
    setUserID(userID);

    // AUTO LOGOUT TIME SET (YOU CAN PLAY AROUND WITH THAT TIME TO AUTO LOGOUT)
    const hourInMili = 1000 * 60 * 60;

    // SET TO EITHER EXP TIME FROM PREV OR CURRENT TIME + 1 Hour
    const autoLogoutTime = exp || new Date(new Date().getTime() + hourInMili);

    setExpTime(autoLogoutTime);

    localStorage.setItem(
      "data",
      JSON.stringify({
        token: token,
        username: user,
        userID: userID,
        expireTime: autoLogoutTime.toISOString(),
      })
    );
  };

  const logout = () => {
    setExpTime(null);
    setToken(null);
    setUsername(null);
    setUserID(null);
    localStorage.removeItem("data");
    navigate("/");
  };

  // AUTO LOGOUT
  useEffect(() => {
    let timer;
    if (token && expTime) {
      const leftLoggedInTime = expTime.getTime() - new Date().getTime();
      timer = setTimeout(logout, leftLoggedInTime);
    } else {
      clearTimeout(timer);
    }
  }, [token, expTime, logout]);

  // CHECK USER AUTHENTICATION STATUS ON INITIAL RENDER
  useEffect(() => {
    const lsData = JSON.parse(localStorage.getItem("data"));
    if (lsData && lsData.token && new Date(lsData.expireTime) > new Date()) {
      login(
        lsData.token,
        lsData.username,
        lsData.userID,
        new Date(lsData.expireTime)
      );
      if (window.location.pathname === "/") navigate("/dashboard");
    }
  }, []);

  useEffect(() => {
    function start(){
    if(clientId){
      gapi.client.init({
        clientId : clientId,
        scope: "",
        audience: ["1084433748458-f117f0kvq4u7ve0vftgkaa97se04q7h3.apps.googleusercontent.com", "apps.googleusercontent.com"],
      })
    }
  };
    gapi.load('client:auth2', start);
  })
  
  const checkLogs = async() => {
    try {
      const emails = await axios.get("http://localhost:3000/api/users/checkLogs");
      emails.data.forEach(user => {
          if(user.email){
            console.log('sending email to', user.email)
            sendEmail(user.email, user.lastlogged, send)
          }
        });
    } catch(err) {
      console.log(err)
    }
    return 
  }
  useEffect(() => {
    checkLogs();
  }, []);

  const sendEmail = (email, time) => {
    const data = {
      service_id: 'service_qgmhpqv',
      template_id: 'template_9zl87uc',
      user_id: 'Ju-xBlMV8XvFM71-Y',
      template_params: {
          'to_name': email,
          'time_diff': time
      }
  };
  
    emailjs.send(data.service_id, data.template_id, data.template_params, data.user_id)
      .then((result) => {
        console.log('hitting here')
          console.log(result.text);
      }, (error) => {
        console.log('fail here')
          console.log(error.text);
      });
  };

  return (
    <>
      <AuthContext.Provider value={{ token, login, logout, userID, username }}>
        {/* <BrowserRouter> */}
        <Routes>
          {token ? (
            <>
              <Route
                path="/dashboard"
                element={<Dashboard username={username} />}
              />
            </>
          ) : (
            <>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
        </Routes>
        {/* </BrowserRouter> */}
      </AuthContext.Provider>
    </>
  );
}

export default App;
