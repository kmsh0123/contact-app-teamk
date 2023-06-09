import React, { useState } from "react";
import { PasswordInput, TextInput } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/api/authApi";
import { useForm, zodResolver } from "@mantine/form";
import { Loader } from "@mantine/core";
import { z } from "zod";
import "../style/glassmorphic.css";

const Signup = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const nav = useNavigate();

  const schema = z.object({
    name: z.string().min(2, { message: "Name should have at least 2 letters" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(8, { message: "Password must have at least 8 characters." }),
    // Password_confirmation: z
    //   .string()
    //   .refine((value) => value !== form.values.password, {
    //     message: "Passwords do not match",
    //     path: ["password_confirmation"],
    //   }),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  return (
    <div className=" flex justify-center items-center h-screen">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await register(values);
            console.log(data);
            if (data?.success === true) {
              nav("/login");
            }
          } catch (error) {
            console.log(error);
          }
        })}
        className=" xl:w-96 md:w-96 w-80 flex flex-col gap-8 bg-[#ffffff19] backdrop-blur-sm border-t-[rgba(255,255,255,0.5)] border-l-[rgba(255,255,255,0.5)] border-solid border-t border-l rounded glassmorphic rounded-lg p-7"
      >
         <h2
          className=" flex flex-col text-center justify-center text-gray-500 font-medium text-[32px]
      "
        >
         Hello there! <br /> 
         <span className=" mt-[-6px] text-[13px]">Please sign in here to proceed.</span>
        </h2>
        <TextInput
          {...form.getInputProps("name")}
          placeholder="Enter your name"
          variant="filled"
        />
        <TextInput
          {...form.getInputProps("email")}
          placeholder="Enter your email"
          variant="filled"
        />
        <PasswordInput
          {...form.getInputProps("password")}
          placeholder=" Enter your Password"
          variant="filled"
        />
        <PasswordInput
          {...form.getInputProps("password_confirmation")}
          placeholder="Confirm your Password ..."
          variant="filled"
        />
        <div className=" flex gap-1">
          <p className=" select-none text-gray-500">Already have an account?</p>
          <Link to={"/login"}>
            <p className=" select-none text-blue-500 cursor-pointer">
              Login here.
            </p>
          </Link>
        </div>
        <button
          disabled={isLoading && true}
          type="submit"
          className=" bg-blue-600 text-white hover:bg-gray-400 px-4 py-1 rounded w-40 h-9 mx-auto block"
        >
          {isLoading ? (
            <Loader
              className=" mx-auto my-auto block"
              color="white"
              size="sm"
            />
          ) : (
            "Sign up"
          )}
        </button>
      </form>
    </div>
  );
};

export default Signup;
