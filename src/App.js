import React, { createContext, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/feature/authSlice";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Advert from "./page/Advert";
import Dashboard from "./page/Dashboard";
import Home from "./page/Home";
import Signup from "./page/Signup";
import Signin from "./page/Signin";
import Profile from "./page/Profile";
import AdvertForm from "./page/AdvertForm";
import Header from "./component/Header";
import PrivateRoute from "./container/PrivateRoute";
import NotFound from "./container/NotFound";
//import logo from "./logo.svg";

export const GlobalContext = createContext(null);

function App() {
  const dispatch = useDispatch();
  const profile = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(profile));
  }, []);
  const { user } = useSelector((state) => ({ ...state.auth }));

  return (
    <GlobalContext.Provider value={{ dispatch, user }}>
      <GoogleOAuthProvider clientId="553518116161-03vksgi9p5433q3v9rivev8sio8pp63l.apps.googleusercontent.com">
        <BrowserRouter>
          <div className="App">
            <Header />
            <ToastContainer />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route
                path="/my-profile/"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/create-advert"
                element={
                  <PrivateRoute>
                    <AdvertForm />
                  </PrivateRoute>
                }
              />
              <Route path="/advert/:id" element={<Advert />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-advert/:id"
                element={
                  <PrivateRoute>
                    <AdvertForm />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
          </div>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </GlobalContext.Provider>
  );
}

export default App;
