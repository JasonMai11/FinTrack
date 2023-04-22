import React, {Component} from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginForm";
import RegisterPage from "./components/RegisterForm";
import PostRegisterInformation from "./components/PostRegisterInformation";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/post-register-information" element={<PostRegisterInformation/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
