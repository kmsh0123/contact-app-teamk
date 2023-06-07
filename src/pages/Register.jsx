import { useGetRegisterMutation } from "../redux/Api/contactApi";
import { Loader, PasswordInput, TextInput } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { MdOutlineEmail } from "react-icons/md";
import {MdOutlineKey} from 'react-icons/md';
import {RiUser6Line} from 'react-icons/ri'

const Register = () => {
  const [getRegister, { isLoading }] = useGetRegisterMutation();

  const nav = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      password: (value) =>
        value.length < 8 ? "Password must have at least 8 characters" : null,
      password_confirmation: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  if (isLoading) {
    <div className="flex justify-center text-center h-screen">
      <h1 className="">Loading</h1>
    </div>;
  }

  return (
    <>
      <div className=" flex justify-center items-center h-screen">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await getRegister(values);
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
            "Register"
          )}
        </button>
      </form>
    </div>
    </>
  );
};

export default Register;
