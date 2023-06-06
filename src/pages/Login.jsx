import React from "react";
import { Loader, PasswordInput, TextInput } from "@mantine/core";
import { useGetLoginMutation } from "../redux/Api/contactApi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/service/authSlice";
import { MdOutlineEmail } from "react-icons/md";
import {MdOutlineKey} from 'react-icons/md';

const Login = () => {
  const [getLogin, { isLoading }] = useGetLoginMutation();

  const nav = useNavigate();

  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      email: "admin@gmail.com",
      password: "admin123",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must have at least 8 characters" : null,
    },
  });

  if (isLoading) {
    <div className="">
      <h1 className=" flex justify-center items-center h-screen">Loading</h1>
    </div>;
  }

  return (
    <>
      <div className=" flex justify-center items-center h-screen bg-amber-200">
        <div className="bg-gray-500 w-[80%] p-8 rounded-xl flex justify-around items-center">
          <form
            onSubmit={form.onSubmit(async (values) => {
              try {
                const { data } = await getLogin(values);
                dispatch(addUser({ user: data?.user, token: data?.token }));
                console.log(data);
                console.log(values);
                if (data?.success === true) {
                  nav("/");
                }
              } catch (error) {
                console.log(error);
              }
            })}
            className=" w-96 border p-5 rounded-xl bg-orange-400 flex flex-col gap-5 shadow-lg"
          >
            <h1 className=" text-center mb-3 text-blue-600 text-xl font-semibold ">
              Login
            </h1>
            <div className="flex flex-col gap-5">
                <TextInput
                  mt="sm"
                  label="Email"
                  icon={<MdOutlineEmail className="text-2xl " />}
                  placeholder="Email"
                  {...form.getInputProps("email")}
                />
              <PasswordInput
                label="Password"
                icon={<MdOutlineKey className="text-2xl"/>}
                placeholder="Password"
                {...form.getInputProps("password")}
              />
              <div className=" flex justify-around">
                <h1 className="">Don't have an account?</h1>
                <Link to={"/register"}>
                  <h1 className=" font-semibold cursor-pointer">Register</h1>
                </Link>
              </div>
              <button
                disabled={isLoading && true}
                type="submit"
                className=" bg-green-500 text-black  rounded-2xl"
              >
                {isLoading ? (
                  <Loader
                    className=" w-10 mx-auto items-center "
                    color="grape"
                    variant="dots"
                  />
                ) : (
                  <h1 className="py-2">LogIn</h1>
                )}
              </button>
            </div>
          </form>
          <div className="border">
            <h1 className="text-2xl text-white">Pic</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
