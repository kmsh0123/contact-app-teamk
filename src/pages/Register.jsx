import React, { useState } from "react";
import { useGetRegisterMutation } from "../redux/Api/contactApi";
import { Link, useNavigate } from "react-router-dom";
import { PasswordInput, TextInput } from "@mantine/core";

const Register = () => {
  const [getRegister] = useGetRegisterMutation();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");

  const nav = useNavigate();

  const registerHandler = async (e) => {
    try {
      e.preventDefault();
      const user = { email, name, password, password_confirmation };
      const { data } = await getRegister(user);
      console.log(data);
      if (data?.success) {
        nav("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-amber-200">
      <form
        className=" w-96 p-5 flex flex-col gap-5 shadow-lg bg-orange-400 text-center"
        onSubmit={registerHandler}
      >
        <h1 className=" text-center mb-3 text-xl font-semibold ">
          Hello Friend!
        </h1>
        <div className="flex flex-col gap-5">
          <TextInput
            mt="md"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            mt="md"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // {...form.getInputProps("name")}
          />
          <PasswordInput
            mt="md"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // {...form.getInputProps("password")}
          />
          <PasswordInput
            mt="md"
            placeholder="Confirm Password"
            value={password_confirmation}
            onChange={(e) => setPassword_confirmation(e.target.value)}
            // {...form.getInputProps("password_confirmation")}
          />
          <div className=" flex justify-around items-center">
            <h1 className="">Already have an acc?</h1>
            <Link to={"/login"}>
              <p className=" cursor-pointer font-semibold">Login</p>
            </Link>
          </div>
          <button type="submit" className=" bg-teal-400 text-black py-2">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
