import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Routeguard from "../components/Routeguard";

const Paths = () => {
  return (
    <div>
      <Routes>
        <Route
          path={"/"}
          element={
            <Routeguard>
              {" "}
              <Home />
            </Routeguard>
          }
        />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </div>
  );
};

export default Paths;
