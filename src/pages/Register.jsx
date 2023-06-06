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
      <div className="flex justify-center items-center h-screen bg-amber-200">
        <div className=" bg-gray-700 w-[80%] p-5 rounded-xl flex justify-around items-center">
          <form
            className=" w-96 p-5 flex flex-col rounded-xl gap-5 shadow-lg bg-purple-700"
            onSubmit={form.onSubmit(async (values) => {
              try {
                const { data } = await getRegister(values);
                console.log(data);
                console.log(values);
                if (data?.success) {
                  nav("/login");
                }
              } catch (error) {
                console.log(error);
              }
            })}
          >
            <h1 className=" text-center mb-3 text-xl font-semibold ">
              Hello Friend!
            </h1>
            <div className="flex flex-col gap-5">
              <TextInput
                mt="sm"
                label="Email"
                icon={<MdOutlineEmail className="text-2xl"/>}
                placeholder="Email"
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Name"
                icon={<RiUser6Line className="text-2xl"/>}
                placeholder="Name"
                {...form.getInputProps("name")}
              />
              <PasswordInput
                label="Password"
                icon={<MdOutlineKey className="text-2xl"/>}

                placeholder="Password"
                {...form.getInputProps("password")}
              />
              <PasswordInput
                mt="sm"
                label="Confirm password"
                icon={<MdOutlineKey className="text-2xl"/>}

                placeholder="Confirm password"
                {...form.getInputProps("password_confirmation")}
              />
              <div className=" flex justify-around items-center">
                <h1 className="">Already have an acc?</h1>
                <Link to={"/login"}>
                  <p className=" cursor-pointer font-semibold">Login</p>
                </Link>
              </div>
              <button
                disabled={isLoading && true}
                type="submit"
                className=" bg-teal-400 text-black py-2 rounded-2xl"
              >
                {isLoading ? (
                  <Loader
                    className=" w-10 mx-auto items-center "
                    color="grape"
                    variant="dots"
                  />
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>

          <div className="border ">
            <h1 className="text-white text-3xl">Pic</h1>
            <img src="../images/registration-event.png" alt="" className="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
