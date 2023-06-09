import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Routeguard from "../components/Routeguard";
import ProfileDetail from "../pages/ProfileDetail";


const Path = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Routeguard>
              <Home />
            </Routeguard>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={
            <Routeguard>
              <ProfileDetail />
            </Routeguard>
          }
        />
      </Routes>
    </div>
  );
};

export default Path;
