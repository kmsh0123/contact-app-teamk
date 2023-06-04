import React, { useState } from "react";
import { useGetLoginMutation } from "../redux/Api/contactApi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/services/authSlice";
import { PasswordInput, TextInput } from "@mantine/core";

const Login = () => {
  const [getLogin] = useGetLoginMutation();

  const [email, setEmail] = useState("mary20@gmail.com");
  const [password, setPassword] = useState("123456789");

  const nav = useNavigate();

  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      const user = { email, password };
      const { data } = await getLogin(user);
      dispatch(addUser({ user: data?.user, token: data?.token }));
      console.log(data);
      if (data?.success) {
        nav("/");
      }
    } catch (error) {
      console.log(error);
    }
  };


 

  return (
    <div className=" flex justify-center items-center h-screen bg-amber-200">
      <form
        onSubmit={loginHandler}
        className=" w-96 border p-5 bg-orange-400 flex flex-col gap-5 shadow-lg  text-center"
      >
        <h1 className=" text-center mb-3 text-blue-600 text-xl font-semibold ">
          Login
        </h1>
        <div className="flex flex-col gap-5">
          <TextInput
            mt="md"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // {...form.getInputProps("email")}
          />
          <PasswordInput
            mt="md"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // {...form.getInputProps("password")}
          />
          <div className=" flex justify-around">
            <h1 className="">Do not have an account?</h1>
            <Link to={"/register"}>
              <h1 className=" font-semibold cursor-pointer">Register</h1>
            </Link>
          </div>
          <button type="submit" className=" bg-green-400 text-black py-2">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
