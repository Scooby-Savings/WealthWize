import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Signup from "./pages/Signup";
import LoginPage from "./pages/LoginPage";
import { AuthContext } from "./authContext";
import "./index.css";
import {gapi} from 'gapi-script';
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
    // const tenSecInMili = 10000;

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
      gapi.client.init({
        clientId : clientId,
        scope: ""
      })
    };

    gapi.load('client:auth2', start);
  })

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
