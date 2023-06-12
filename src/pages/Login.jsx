import { Loader, PasswordInput, TextInput } from "@mantine/core";
import { useGetLoginMutation } from "../redux/Api/contactApi";
import { useForm, zodResolver } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/service/authSlice";
import { LoginSchema } from "../schemas/loginSchema";
import "../style/login.css";
import "../style/glassmorphic.css";
import Register from "./Register";
import { toggleNavbar } from "../redux/service/navbarSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const isOpen = useSelector((state) => state.navbar.isOpen);
  const [getLogin, { isLoading }] = useGetLoginMutation();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const form = useForm({
    validate: zodResolver(LoginSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div>
      <div className=" bg-transparent">
        <div className=" flex justify-center items-center h-screen">
          <div className=" md:space-x-8 lg:space-x-28 flex items-center p-5">
            <div>
              <div className={` imgAni overflow-hidden flex flex-col `}>
                <img
                  className={` hidden md:flex ${isOpen ? "imgAni" : "endAni"}`}
                  src="https://cdni.iconscout.com/illustration/premium/thumb/login-3305943-2757111.png"
                  alt=""
                />
              </div>
              <div className=" hidden md:flex justify-center gap-[8px]">
                {isOpen ? (
                  <p className=" flex items-center select-none logAni text-gray-600">
                    New to our service?
                  </p>
                ) : (
                  <p className=" flex items-center select-none endAni text-gray-600">
                    New to our service?
                  </p>
                )}

                <span onClick={() => dispatch(toggleNavbar())} className="">
                  {isOpen ? (
                    <button className=" relative z-20 select-none regAni text-red-700 bg-[#ffffff19] backdrop-blur-sm border-t-[rgba(255,255,255,0.5)] border-l-[rgba(255,255,255,0.5)] border-solid glassmorphic border-t border-l rounded-lg p-2 cursor-pointer">
                      Register here.
                    </button>
                  ) : (
                    <button className=" relative z-20 select-none endAni text-red-700 bg-[#ffffff19] backdrop-blur-sm border-t-[rgba(255,255,255,0.5)] border-l-[rgba(255,255,255,0.5)] border-solid glassmorphic border-t border-l rounded-lg p-2 cursor-pointer">
                      Register here.
                    </button>
                  )}
                </span>
              </div>
            </div>
            <div className=" ">
              <form
                onSubmit={form.onSubmit(async (values) => {
                  try {
                    const { data } = await getLogin(values);
                    console.log(data);
                    dispatch(
                      addUser({
                        user: data?.user,
                        token: data?.token,
                      })
                    );
                    if (data?.success === true) {
                      nav("/");
                    }
                  } catch (error) {
                    console.log(error);
                  }
                })}
                className={` ${
                  isOpen ? " relative z-20" : " pointer-events-none"
                } xl:w-96 md:w-96 w-80 flex flex-col gap-8 bg-[#ffffff19] backdrop-blur-sm border-t-[rgba(255,255,255,0.5)] border-l-[rgba(255,255,255,0.5)] border-solid glassmorphic border-t border-l rounded-lg p-[1.8rem] md:p-[3.9rem] ${
                  isOpen ? "finalAni" : "formAni"
                }`}
              >
                <h2 className={` text-gray-500 font-medium text-[28px]`}>
                  <span
                    className={` container mx-auto ${
                      isOpen ? "typeAni" : "endTypeAni"
                    }`}
                  >
                    Welcome back!
                  </span>

                  <span
                    className={` grid  ${
                      isOpen ? "upAni" : "endAni"
                    } justify-center mt-[-6px] text-[15px]`}
                  >
                    Please login here to continue.
                  </span>
                </h2>
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

                <div className=" text-sm md:hidden flex justify-center gap-1 lg:gap-[6px]">
                  {isOpen ? (
                    <p className=" select-none logAni text-gray-600">
                      New to our service?
                    </p>
                  ) : (
                    <p className=" select-none endAni text-gray-600">
                      New to our service?
                    </p>
                  )}

                  <span onClick={() => dispatch(toggleNavbar())} className="">
                    {isOpen ? (
                      <p className=" select-none regAni text-blue-700 cursor-pointer">
                        Register here.
                      </p>
                    ) : (
                      <p className=" select-none endAni text-blue-700 cursor-pointer">
                        Register here.
                      </p>
                    )}
                  </span>
                </div>

                <button
                  disabled={isLoading && true}
                  type="submit"
                  className=" bg-blue-600 text-white hover:bg-blue-400 px-4 py-1 transition duration-300 rounded w-40 h-9 mx-auto block"
                >
                  {isLoading ? (
                    <Loader
                      className=" mx-auto my-auto block"
                      color="white"
                      size="sm"
                      variant="dots"
                    />
                  ) : (
                    "Log in"
                  )}
                </button>
              </form>
            </div>
          </div>
          <div className={` absolute`}>
            {/* {isOpen ? null : (
              <div className=" relative z-10">
                <Register />
              </div>
            )} */}
            <Register />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
