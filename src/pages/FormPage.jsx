import React from "react";

import { useSelector } from "react-redux";
import Login from "../components/Login";
import Register from "../components/Register";

const FormPage = () => {
  const isOpen = useSelector((state) => state.navbar.isOpen);
  return (
    <div>
      <div className={` ${isOpen ? " bgBlueIn" : " bgRedIn"}`}>
        <div>
          <Login />
        </div>
        <div className={` absolute`}>
          <Register />
        </div>
      </div>
    </div>
  );
};

export default FormPage;
