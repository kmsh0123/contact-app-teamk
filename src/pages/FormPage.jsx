import React from "react";

import { useSelector } from "react-redux";
import Login from "../components/Login";
import Register from "../components/Register";

const FormPage = () => {
  const isOpen = useSelector((state) => state.navbar.isOpen);
  return (
    <div
      className={` ${
        isOpen
          ? " bg-gradient-to-r from-blue-100 to-blue-500"
          : " bg-gradient-to-r from-red-100 to-red-500"
      }`}
    >
      <div>
        <Login />
      </div>
      <div className={` absolute`}>
        <Register />
      </div>
    </div>
  );
};

export default FormPage;
